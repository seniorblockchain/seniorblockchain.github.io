import { SBC_MASTER_ADDRESS } from '../utils/transactionConfig';

export const SITE = {
  url: 'https://seniorblockchain.github.io',
  name: 'SBC Exchange',
  organization: 'Senior Blockchain Company',
  slogan: 'Decentralize Everything',
  locale: 'en_US',
  themeColor: '#04111b',
  ogImage: '/og-image.png',
  logo: '/logo.png',
  sameAs: ['https://www.instagram.com/seniorblockchain', `https://tonviewer.com/${SBC_MASTER_ADDRESS}`],
};

export const DEFAULT_TITLE = 'SBC Exchange — Buy & Sell SBC Token with USDT on TON';
export const DEFAULT_DESCRIPTION =
  'Buy and sell SBC, the Senior Blockchain Company token, with USDT on TON. Live pool pricing, instant quotes and non-custodial swaps from your wallet.';

export const KEYWORDS = [
  'SBC',
  'SBC token',
  'Senior Blockchain Company',
  'buy SBC',
  'sell SBC',
  'SBC USDT',
  'SBC price',
  'TON jetton',
  'TON blockchain',
  'Tonkeeper',
  'USDT on TON',
  'crypto exchange',
];

export const TOKEN = {
  name: 'Senior Blockchain Company',
  symbol: 'SBC',
  network: 'TON (The Open Network)',
  standard: 'Jetton (TEP-74)',
  totalSupply: 256_000_000,
  decimals: 8,
  contract: SBC_MASTER_ADDRESS,
};

export const TOKENOMICS = [
  { label: 'Initial & Public Sale', share: 35, note: '15% private sale and 20% public sale' },
  { label: 'Marketing & Development', share: 20, note: 'Advertising campaigns and strategic partnerships' },
  { label: 'Network Rewards', share: 20, note: 'Staking and user activity rewards' },
  { label: 'Team & Founders', share: 15, note: 'Locked for 2 years, then unlocked over 4 semi-annual periods' },
  { label: 'Strategic Reserve', share: 10, note: 'Emergencies and long-term development' },
];

export const FAQ = [
  {
    q: 'What is SBC?',
    a: 'SBC is the native token of Senior Blockchain Company. It is a jetton issued on the TON blockchain with a total supply of 256,000,000 SBC and powers an ecosystem of programming, blockchain and AI services built around the vision “Decentralize Everything”.',
  },
  {
    q: 'How do I buy SBC?',
    a: 'Connect a TON wallet such as Tonkeeper, choose “Buy SBC”, enter the amount of USDT you want to spend and confirm the transfer in your wallet. The quote shows exactly how much SBC you receive and the price impact before you sign.',
  },
  {
    q: 'How do I sell SBC for USDT?',
    a: 'Switch to “Sell SBC”, enter the amount of SBC, review the USDT you will receive and approve the transaction in your wallet.',
  },
  {
    q: 'How is the SBC price calculated?',
    a: 'Prices come from a constant-product pool (k = SBC reserve × USDT reserve). The spot price is the USDT reserve divided by the SBC reserve, and larger orders move the price more — this is shown as price impact on every quote.',
  },
  {
    q: 'Which wallet do I need?',
    a: 'Any wallet that supports TON Connect, for example Tonkeeper, MyTonWallet or Telegram Wallet. You also need a small amount of TON to pay network fees.',
  },
  {
    q: 'Is SBC Exchange custodial?',
    a: 'No. SBC Exchange never holds your funds or private keys. Every transfer is created by the app and signed by you inside your own wallet.',
  },
  {
    q: 'What is the official SBC contract address?',
    a: `The official SBC jetton master address on TON is ${SBC_MASTER_ADDRESS}. Always verify this address before trading.`,
  },
];
