import React, { useEffect, useState } from 'react';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import exchangeConfig from '../data/exchange-config.json';
import { SBCLogo } from '../assets/logos/SBCLogo';
import { handleSendSBC } from '../payments/sendSBC';
import { handleSendUsdt } from '../payments/sendUsdt';
import {
  formatCompactNumber,
  formatPercent,
  formatPrice,
  getBuyQuote,
  getSellQuote,
  getSpotPrice,
  type PoolState,
} from '../utils/exchangeMath';
import { getJettonWalletAddress } from '../utils/getJettonWalletAddress';
import { SBC_MASTER_ADDRESS, USDT_MASTER_ADDRESS } from '../utils/transactionConfig';

type ExchangeConfig = typeof exchangeConfig;
type TradeMode = 'buy' | 'sell';

type BalanceState = {
  usdt: number;
  sbc: number;
};

const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-6)}`;

export const ExchangeShell: React.FC<{ config: ExchangeConfig }> = ({ config }) => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const [mode, setMode] = useState<TradeMode>('buy');
  const [tradeAmount, setTradeAmount] = useState<string>('250');
  const [balances, setBalances] = useState<BalanceState>({ usdt: 0, sbc: 0 });
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pool: PoolState = config.pool;
  const numericAmount = Number(tradeAmount) || 0;
  const spotPrice = getSpotPrice(pool);
  const buyQuote = getBuyQuote(pool, numericAmount);
  const sellQuote = getSellQuote(pool, numericAmount);
  const activeQuote = mode === 'buy' ? buyQuote : sellQuote;
  useEffect(() => {
    const fetchBalances = async () => {
      if (!userFriendlyAddress) {
        setBalances({ usdt: 0, sbc: 0 });
        return;
      }

      setIsLoadingBalances(true);
      try {
        const [usdtResult, sbcResult] = await Promise.all([
          getJettonWalletAddress(userFriendlyAddress, USDT_MASTER_ADDRESS),
          getJettonWalletAddress(userFriendlyAddress, SBC_MASTER_ADDRESS),
        ]);

        setBalances({
          usdt: usdtResult.balance ? usdtResult.balance / 1_000_000 : 0,
          sbc: sbcResult.balance ? sbcResult.balance / 100_000_000 : 0,
        });
      } catch (error) {
        console.error('Error fetching balances:', error);
        setBalances({ usdt: 0, sbc: 0 });
      } finally {
        setIsLoadingBalances(false);
      }
    };

    fetchBalances();
  }, [userFriendlyAddress]);

  const handleConnect = async () => {
    if (!userFriendlyAddress) {
      await tonConnectUI.connectWallet();
      return;
    }

    localStorage.removeItem('tonconnect');
    await tonConnectUI.disconnect();
  };

  const handleTrade = async (tradeMode: TradeMode) => {
    if (!userFriendlyAddress || numericAmount <= 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (tradeMode === 'buy') {
        await handleSendUsdt(tonConnectUI, userFriendlyAddress, numericAmount, config.treasuryWallet);
      } else {
        await handleSendSBC(tonConnectUI, userFriendlyAddress, numericAmount, config.treasuryWallet);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBalanceEnough = mode === 'buy' ? balances.usdt >= numericAmount : balances.sbc >= numericAmount;

  return (
    <div className="min-h-screen bg-[#04111b] text-white">
      <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_42%),radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_30%),linear-gradient(180deg,#072033_0%,#04111b_72%)]" />
      <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6 lg:pb-20">
        <header className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 shadow-[0_10px_30px_rgba(34,211,238,0.18)]">
                <SBCLogo />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/60">SBC Exchange</p>
                <h1 className="mt-1 text-2xl font-black text-white sm:text-3xl">{config.content.headline}</h1>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/guide"
                className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
              >
                Guide
              </a>
              <button
                onClick={handleConnect}
                className="rounded-xl bg-[linear-gradient(135deg,#22d3ee,#14b8a6)] px-4 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.01]"
              >
                {userFriendlyAddress ? 'Disconnect Wallet' : 'Connect Wallet'}
              </button>
            </div>
          </div>
        </header>

        <section id="trade-panel" className="mt-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-[0_25px_80px_rgba(2,12,27,0.45)] backdrop-blur-xl sm:p-7">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/60">Trade</p>
                <h2 className="mt-2 text-3xl font-black text-white">Main Desk</h2>
                <p className="mt-2 text-sm text-slate-400">One pool. One panel. Instant quotes.</p>
              </div>

              <div className="inline-flex w-fit rounded-xl border border-white/10 bg-white/5 p-1">
                <button
                  onClick={() => setMode('buy')}
                  className={`rounded-lg px-5 py-2 text-sm font-bold transition ${
                    mode === 'buy' ? 'bg-cyan-300 text-slate-950' : 'text-slate-300'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setMode('sell')}
                  className={`rounded-lg px-5 py-2 text-sm font-bold transition ${
                    mode === 'sell' ? 'bg-emerald-300 text-slate-950' : 'text-slate-300'
                  }`}
                >
                  Sell
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-white/10 bg-[#071723] px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Spot price</p>
                    <p className="mt-1 text-xl font-black text-white">{formatPrice(spotPrice, 6)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Pool value</p>
                    <p className="mt-1 text-xl font-black text-white">{formatPrice(pool.usdt, 2)}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#071723] px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">SBC total</p>
                    <p className="mt-1 text-xl font-black text-white">{formatCompactNumber(pool.sbc, 0)} SBC</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Wallet</p>
                    <p className="mt-1 text-sm font-semibold text-cyan-100">
                      {userFriendlyAddress ? formatAddress(userFriendlyAddress) : 'Not connected'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#071723] px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Your USDT</p>
                    <p className="mt-1 text-lg font-black text-white">
                      {isLoadingBalances ? '...' : `${formatCompactNumber(balances.usdt, 2)} USDT`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Your SBC</p>
                    <p className="mt-1 text-lg font-black text-white">
                      {isLoadingBalances ? '...' : `${formatCompactNumber(balances.sbc, 2)} SBC`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-[#071723] p-5">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{mode === 'buy' ? 'You pay' : 'You sell'}</span>
                <span>
                  {mode === 'buy'
                    ? `Balance: ${formatCompactNumber(balances.usdt, 2)} USDT`
                    : `Balance: ${formatCompactNumber(balances.sbc, 2)} SBC`}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={tradeAmount}
                  onChange={(event) => setTradeAmount(event.target.value)}
                  className="w-full bg-transparent text-4xl font-black text-white outline-none placeholder:text-slate-600"
                  placeholder="0"
                />
                <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200">
                  {mode === 'buy' ? 'USDT' : 'SBC'}
                </div>
              </div>
            </div>

            <div className="my-5 flex justify-center">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-cyan-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#071723] p-5">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{mode === 'buy' ? 'Receive' : 'Receive'}</span>
                <span>{formatPrice(activeQuote.executionPrice || spotPrice, 4)} / SBC</span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="text-4xl font-black text-white">
                  {formatCompactNumber(activeQuote.amountOut, 4)}
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200">
                  {mode === 'buy' ? 'SBC' : 'USDT'}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300 sm:grid-cols-3">
              <div>
                <p className="text-slate-500">Spot</p>
                <p className="mt-1 font-bold text-white">{formatPrice(spotPrice, 4)}</p>
              </div>
              <div>
                <p className="text-slate-500">Exec</p>
                <p className="mt-1 font-bold text-white">{formatPrice(activeQuote.executionPrice || 0, 4)}</p>
              </div>
              <div>
                <p className="text-slate-500">Impact</p>
                <p className="mt-1 font-bold text-white">{formatPercent(activeQuote.priceImpact)}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setMode('buy');
                  void handleTrade('buy');
                }}
                disabled={!userFriendlyAddress || numericAmount <= 0 || balances.usdt < numericAmount || isSubmitting}
                className="rounded-xl bg-[linear-gradient(135deg,#22d3ee,#14b8a6)] px-6 py-4 text-base font-black text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting && mode === 'buy' ? 'Processing...' : 'Buy'}
              </button>
              <button
                onClick={() => {
                  setMode('sell');
                  void handleTrade('sell');
                }}
                disabled={!userFriendlyAddress || numericAmount <= 0 || balances.sbc < numericAmount || isSubmitting}
                className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-6 py-4 text-base font-black text-emerald-100 transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting && mode === 'sell' ? 'Processing...' : 'Sell'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};