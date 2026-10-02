import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import exchangeConfig from '../data/exchange-config.json';
import { ExchangeShell } from './ExchangeShell';

const manifestUrl = 'https://seniorblockchain.github.io/tonconnect-manifest.json';

export const ExchangeApp: React.FC = () => {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <ExchangeShell config={exchangeConfig} />
    </TonConnectUIProvider>
  );
};