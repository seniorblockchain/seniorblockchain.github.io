import { Address } from 'ton';
import { getJettonWalletAddress } from './getJettonWalletAddress';
import { SBC_MASTER_ADDRESS, USDT_MASTER_ADDRESS } from './transactionConfig';

const TONAPI = 'https://tonapi.io/v2';

export type WalletBalances = {
  usdt: number;
  sbc: number;
  ton: number;
  tonPriceUsd: number;
};

type TonapiJettonBalance = {
  balance: string;
  jetton: { address: string; decimals: number };
};

type TonapiRates = { rates: { TON?: { prices?: { USD?: number } } } };

const isSameAddress = (a: string, b: string) => {
  try {
    return Address.parse(a).equals(Address.parse(b));
  } catch {
    return false;
  }
};

const toUnits = (raw: string | number, decimals: number) => Number(raw) / 10 ** decimals;

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${url}`);
  }
  return response.json() as Promise<T>;
};

const fetchFromTonapi = async (owner: string): Promise<WalletBalances> => {
  const [jettons, account, rates] = await Promise.all([
    fetchJson<{ balances: TonapiJettonBalance[] }>(`${TONAPI}/accounts/${owner}/jettons`),
    fetchJson<{ balance: number }>(`${TONAPI}/accounts/${owner}`),
    fetchJson<TonapiRates>(`${TONAPI}/rates?tokens=ton&currencies=usd`).catch((): TonapiRates => ({ rates: {} })),
  ]);

  const find = (master: string) => jettons.balances.find((item) => isSameAddress(item.jetton.address, master));
  const usdt = find(USDT_MASTER_ADDRESS);
  const sbc = find(SBC_MASTER_ADDRESS);

  return {
    usdt: usdt ? toUnits(usdt.balance, usdt.jetton.decimals) : 0,
    sbc: sbc ? toUnits(sbc.balance, sbc.jetton.decimals) : 0,
    ton: toUnits(account.balance, 9),
    tonPriceUsd: rates.rates.TON?.prices?.USD ?? 0,
  };
};

// Fallback: toncenter via tonweb (rate-limited without an API key, so calls are sequential)
const fetchFromToncenter = async (owner: string): Promise<WalletBalances> => {
  const usdt = await getJettonWalletAddress(owner, USDT_MASTER_ADDRESS);
  const sbc = await getJettonWalletAddress(owner, SBC_MASTER_ADDRESS);

  return {
    usdt: toUnits(usdt.balance || 0, 6),
    sbc: toUnits(sbc.balance || 0, 8),
    ton: 0,
    tonPriceUsd: 0,
  };
};

export const fetchWalletBalances = async (owner: string): Promise<WalletBalances> => {
  try {
    return await fetchFromTonapi(owner);
  } catch (error) {
    console.warn('tonapi balance fetch failed, falling back to toncenter:', error);
    return fetchFromToncenter(owner);
  }
};
