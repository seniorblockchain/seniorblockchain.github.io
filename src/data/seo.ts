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

export const DEFAULT_TITLE = 'SBC Exchange | Buy & Sell SBC on TON';
export const DEFAULT_DESCRIPTION =
  'Buy and sell SBC with USDT on TON. Check the quote and confirm in your wallet.';

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
  { label: 'Marketing & Development', share: 20, note: 'Marketing and partnerships' },
  { label: 'Network Rewards', share: 20, note: 'Staking and user activity rewards' },
  { label: 'Team & Founders', share: 15, note: 'Locked for 2 years, then released in 4 rounds, 6 months apart' },
  { label: 'Strategic Reserve', share: 10, note: 'Emergencies and future development' },
];

export const FAQ = [
  {
    q: 'What is SBC?',
    a: 'SBC is the Senior Blockchain Company token on TON. Its total supply is 256 million tokens.',
  },
  {
    q: 'How do I buy SBC?',
    a: 'Connect your TON wallet and select Buy SBC. Enter a USDT amount, check the quote and price impact, then confirm in your wallet.',
  },
  {
    q: 'How do I sell SBC for USDT?',
    a: 'Select Sell SBC, enter an amount, check the USDT quote and confirm in your wallet.',
  },
  {
    q: 'How is the SBC price calculated?',
    a: 'The base price is the USDT reserve divided by the SBC reserve. Quotes use a constant-product formula. Larger trades have more price impact.',
  },
  {
    q: 'Which wallet do I need?',
    a: 'Use a TON Connect wallet such as Tonkeeper or MyTonWallet. Keep some TON for network fees.',
  },
  {
    q: 'Is SBC Exchange custodial?',
    a: 'You keep your private keys and sign each transfer in your wallet. Buy and sell payments go to the treasury wallet.',
  },
  {
    q: 'What is the official SBC contract address?',
    a: `SBC contract: ${SBC_MASTER_ADDRESS}. Verify it before trading.`,
  },
];
