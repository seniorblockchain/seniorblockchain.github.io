import type { PoolState } from './exchangeMath';

export const POOL_REFRESH_INTERVAL = 5_000;

type PoolListener = (pool: PoolState) => void;
const listeners = new Set<PoolListener>();
let latestPool: PoolState | null = null;
let stopPolling: (() => void) | null = null;

export async function fetchCurrentPool(signal?: AbortSignal): Promise<PoolState> {
  // A unique URL also bypasses the static host's CDN and older service workers.
  const response = await fetch(`/exchange-config.json?t=${Date.now()}`, { cache: 'no-store', signal });
  if (!response.ok) throw new Error('Pool request failed');

  const data = await response.json();
  const pool = data?.pool;
  if (!pool || !Number.isFinite(pool.sbc) || !Number.isFinite(pool.usdt) || pool.sbc <= 0 || pool.usdt <= 0) {
    throw new Error('Invalid pool reserves');
  }
  return { sbc: pool.sbc, usdt: pool.usdt };
}

// One request loop per page, shared by the exchange and static price labels.
export function subscribePool(listener: PoolListener): () => void {
  listeners.add(listener);
  if (latestPool) listener(latestPool);

  if (!stopPolling) {
    let stopped = false;
    let controller: AbortController | null = null;

    const refresh = async () => {
      if (stopped || controller || document.visibilityState === 'hidden') return;
      controller = new AbortController();
      const request = controller;
      const timeout = window.setTimeout(() => request.abort(), POOL_REFRESH_INTERVAL);
      try {
        const pool = await fetchCurrentPool(request.signal);
        if (stopped) return;
        latestPool = pool;
        listeners.forEach((notify) => notify(pool));
      } catch {
        // Keep the last valid reserves if the connection or response fails.
      } finally {
        window.clearTimeout(timeout);
        controller = null;
      }
    };

    const onResume = () => { void refresh(); };
    const interval = window.setInterval(onResume, POOL_REFRESH_INTERVAL);
    window.addEventListener('focus', onResume);
    window.addEventListener('online', onResume);
    window.addEventListener('pageshow', onResume);
    document.addEventListener('visibilitychange', onResume);
    stopPolling = () => {
      stopped = true;
      window.clearInterval(interval);
      controller?.abort();
      window.removeEventListener('focus', onResume);
      window.removeEventListener('online', onResume);
      window.removeEventListener('pageshow', onResume);
      document.removeEventListener('visibilitychange', onResume);
    };
    void refresh();
  }

  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      stopPolling?.();
      stopPolling = null;
    }
  };
}
