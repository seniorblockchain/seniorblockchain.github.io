import { Address } from 'ton';
import { toNano } from 'ton';

export const getTxValidUntil = () => Math.floor(Date.now() / 1000) + 600;

// addresses
export const RECEIVER_ADDRESS = Address.parse(
  'UQCUS0q4DJLKBL_dxO492OFd3H-ajpB0_wUfamWNHne1_ehf',
);
export const USDT_MASTER_ADDRESS =
  'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs';
export const SBC_MASTER_ADDRESS =
  'EQBIQe_KkVxaJmga7LVgwvB8lcXbbfsqdziGgDXfD-zW4KU9';

// amount
export const TON_AMOUNT = toNano('0.08');
export const TON_FEE = toNano('0.04');
export const SBC_AMOUNT = toNano('1');
export const USDT_AMOUNT = 0.06 * 1_000_000;
