import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { transform } from 'esbuild';

async function importTypeScript(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  const { code } = await transform(source, { loader: 'ts', format: 'esm' });
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}

const { fetchCurrentPool, subscribePool, POOL_REFRESH_INTERVAL } = await importTypeScript('../src/utils/livePool.ts');
const { getSpotPrice, getBuyQuote, getSellQuote } = await importTypeScript('../src/utils/exchangeMath.ts');
const flush = () => new Promise((resolve) => setImmediate(resolve));

test('requests fresh reserves and rejects invalid responses', async (t) => {
  let request;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    request = { url, options };
    return new Response(JSON.stringify({ pool: { sbc: 1000, usdt: 100 } }));
  });
  assert.deepEqual(await fetchCurrentPool(), { sbc: 1000, usdt: 100 });
  assert.match(request.url, /^\/exchange-config\.json\?t=\d+$/);
  assert.equal(request.options.cache, 'no-store');

  for (const pool of [null, { sbc: 0, usdt: 10 }, { sbc: -1, usdt: 10 }, { sbc: '100', usdt: 10 }, { sbc: 100 }]) {
    globalThis.fetch = async () => new Response(JSON.stringify({ pool }));
    await assert.rejects(fetchCurrentPool(), /Invalid pool reserves/);
  }
  globalThis.fetch = async () => new Response('Unavailable', { status: 503 });
  await assert.rejects(fetchCurrentPool(), /Pool request failed/);
  globalThis.fetch = async () => new Response('<html>404</html>');
  await assert.rejects(fetchCurrentPool());
});

test('an open page updates prices and both quotes with one shared polling loop', async (t) => {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
  const intervals = new Map();
  const timeouts = new Map();
  let timerId = 0;
  const browser = new EventTarget();
  Object.assign(browser, {
    setInterval: (callback, delay) => { intervals.set(++timerId, { callback, delay }); return timerId; },
    clearInterval: (id) => intervals.delete(id),
    setTimeout: (callback) => { timeouts.set(++timerId, callback); return timerId; },
    clearTimeout: (id) => timeouts.delete(id),
  });
  globalThis.window = browser;
  globalThis.document = Object.assign(new EventTarget(), { visibilityState: 'visible' });
  t.after(() => {
    globalThis.window = originalWindow;
    globalThis.document = originalDocument;
  });

  let remotePool = { sbc: 1000, usdt: 100 };
  let unavailable = false;
  let requests = 0;
  t.mock.method(globalThis, 'fetch', async () => {
    requests++;
    if (unavailable) throw new Error('Offline');
    return new Response(JSON.stringify({ pool: remotePool }));
  });

  const updates = [];
  const labels = [];
  const stopExchange = subscribePool((pool) => updates.push({
    price: getSpotPrice(pool), buy: getBuyQuote(pool, 10).amountOut, sell: getSellQuote(pool, 10).amountOut,
  }));
  const stopLabels = subscribePool((pool) => labels.push(getSpotPrice(pool)));
  t.after(stopExchange);
  t.after(stopLabels);
  await flush();
  assert.equal(requests, 1);
  assert.equal(intervals.size, 1);
  const poll = [...intervals.values()][0];
  assert.equal(poll.delay, POOL_REFRESH_INTERVAL);
  assert.equal(poll.delay, 5000);
  assert.equal(updates.at(-1).price, 0.1);

  remotePool = { sbc: 1000, usdt: 200 };
  poll.callback();
  await flush();
  assert.equal(updates.at(-1).price, 0.2);
  assert.equal(labels.at(-1), 0.2);
  assert.ok(updates[1].buy < updates[0].buy);
  assert.ok(updates[1].sell > updates[0].sell);

  unavailable = true;
  poll.callback();
  await flush();
  assert.equal(updates.length, 2);
  assert.equal(updates.at(-1).price, 0.2);
  unavailable = false;

  document.visibilityState = 'hidden';
  const beforeHidden = requests;
  poll.callback();
  await flush();
  assert.equal(requests, beforeHidden);
  remotePool = { sbc: 1000, usdt: 300 };
  document.visibilityState = 'visible';
  document.dispatchEvent(new Event('visibilitychange'));
  await flush();
  assert.equal(updates.at(-1).price, 0.3);

  for (const event of ['focus', 'online', 'pageshow']) {
    const beforeResume = requests;
    window.dispatchEvent(new Event(event));
    await flush();
    assert.equal(requests, beforeResume + 1);
  }

  const normalFetch = globalThis.fetch;
  const beforeTimeout = updates.length;
  let stalledRequests = 0;
  globalThis.fetch = (_url, { signal }) => new Promise((_resolve, reject) => {
    stalledRequests++;
    signal.addEventListener('abort', () => reject(new Error('Timed out')));
  });
  poll.callback();
  poll.callback();
  assert.equal(stalledRequests, 1);
  assert.equal(timeouts.size, 1);
  [...timeouts.values()][0]();
  await flush();
  assert.equal(updates.length, beforeTimeout);
  globalThis.fetch = normalFetch;
  poll.callback();
  await flush();
  assert.equal(updates.length, beforeTimeout + 1);

  stopExchange();
  assert.equal(intervals.size, 1);
  stopLabels();
  assert.equal(intervals.size, 0);
  assert.equal(timeouts.size, 0);
  const beforeStop = requests;
  window.dispatchEvent(new Event('focus'));
  await flush();
  assert.equal(requests, beforeStop);
});
