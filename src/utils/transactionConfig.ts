import { Address } from 'ton';
import { toNano } from 'ton';

export const getTxValidUntil = () => Math.floor(Date.now() / 1000) + 600;

export const USDT_MASTER_ADDRESS =
  'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs';
export const SBC_MASTER_ADDRESS =
  'EQBIQe_KkVxaJmga7LVgwvB8lcXbbfsqdziGgDXfD-zW4KU9';

// amount
export const TON_AMOUNT = toNano('0.08');
export const TON_FEE = toNano('0.04');
export const USDT_AMOUNT = 0.06 * 1_000_000;
