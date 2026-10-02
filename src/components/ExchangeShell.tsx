import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
type Token = 'SBC' | 'USDT';

type BalanceState = {
  usdt: number;
  sbc: number;
};

const formatAddress = (address: string) => `${address.slice(0, 4)}…${address.slice(-4)}`;

const sanitizeAmount = (value: string) => {
  const normalized = value.replace(',', '.').replace(/[^\d.]/g, '');
  const [whole, ...rest] = normalized.split('.');
  return rest.length ? `${whole}.${rest.join('')}` : whole;
};

const USDTIcon = () => (
  <svg viewBox="0 0 32 32" className="h-full w-full" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#26A17B" />
    <path
      fill="#fff"
      d="M17.9 17.4v0c-.1 0-.7.1-2 .1-1 0-1.8 0-2-.1v0c-3.9-.2-6.9-.9-6.9-1.7s3-1.5 6.9-1.7v2.7c.3 0 1 .1 2 .1 1.2 0 1.8-.1 2-.1v-2.7c3.9.2 6.8.9 6.8 1.7s-2.9 1.5-6.8 1.7zm0-3.6v-2.4h5.5V7.7H8.6v3.7h5.5v2.4c-4.4.2-7.8 1.1-7.8 2.2s3.4 2 7.8 2.2v7.9h3.8v-7.9c4.4-.2 7.7-1.1 7.7-2.2s-3.3-2-7.7-2.2z"
    />
  </svg>
);

const TokenIcon: React.FC<{ token: Token; size?: string }> = ({ token, size = 'h-7 w-7' }) => (
  <span className={`inline-flex shrink-0 overflow-hidden rounded-full ${size} [&>svg]:h-full [&>svg]:w-full`}>
    {token === 'SBC' ? <SBCLogo /> : <USDTIcon />}
  </span>
);

const TokenBadge: React.FC<{ token: Token }> = ({ token }) => (
  <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] py-1.5 pl-1.5 pr-3.5">
    <TokenIcon token={token} />
    <span className="text-base font-bold text-white">{token}</span>
  </div>
);

const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`inline-block animate-pulse rounded-md bg-white/10 ${className}`} />
);

const Spinner = () => (
  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
    <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const amountSize = (text: string) =>
  text.length > 9 ? 'text-[26px] xs:text-[34px] sm:text-[40px]' : 'text-[34px] sm:text-[40px]';

const impactTone = (impact: number) => {
  if (impact < 0.01) return 'text-emerald-300';
  if (impact < 0.03) return 'text-amber-300';
  return 'text-rose-400';
};

export const ExchangeShell: React.FC<{ config: ExchangeConfig }> = ({ config }) => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const [mode, setMode] = useState<TradeMode>('buy');
  const [tradeAmount, setTradeAmount] = useState<string>('250');
  const [balances, setBalances] = useState<BalanceState>({ usdt: 0, sbc: 0 });
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [walletMenuOpen, setWalletMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const walletMenuRef = useRef<HTMLDivElement>(null);

  const pool: PoolState = config.pool;
  const numericAmount = Number(tradeAmount) || 0;
  const spotPrice = getSpotPrice(pool);
  const activeQuote = mode === 'buy' ? getBuyQuote(pool, numericAmount) : getSellQuote(pool, numericAmount);

  const payToken: Token = mode === 'buy' ? 'USDT' : 'SBC';
  const receiveToken: Token = mode === 'buy' ? 'SBC' : 'USDT';
  const payBalance = mode === 'buy' ? balances.usdt : balances.sbc;
  const receiveBalance = mode === 'buy' ? balances.sbc : balances.usdt;
  const isBalanceEnough = payBalance >= numericAmount;
  const receiveUsdValue = mode === 'buy' ? activeQuote.amountOut * spotPrice : activeQuote.amountOut;
  const payUsdValue = mode === 'buy' ? numericAmount : numericAmount * spotPrice;
  const receiveText = formatCompactNumber(activeQuote.amountOut, receiveToken === 'USDT' ? 2 : 4);

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

  useEffect(() => {
    if (!walletMenuOpen) return;
    const close = (event: MouseEvent | TouchEvent) => {
      if (walletMenuRef.current && !walletMenuRef.current.contains(event.target as Node)) {
        setWalletMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('touchstart', close);
    };
  }, [walletMenuOpen]);

  const connectWallet = async () => {
    await tonConnectUI.connectWallet();
  };

  const disconnectWallet = async () => {
    setWalletMenuOpen(false);
    localStorage.removeItem('tonconnect');
    await tonConnectUI.disconnect();
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(userFriendlyAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleTrade = async () => {
    if (!userFriendlyAddress || numericAmount <= 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'buy') {
        await handleSendUsdt(tonConnectUI, userFriendlyAddress, numericAmount, config.treasuryWallet);
      } else {
        await handleSendSBC(tonConnectUI, userFriendlyAddress, numericAmount, config.treasuryWallet);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (next: TradeMode) => {
    if (next === mode) return;
    setMode(next);
    setTradeAmount('');
  };

  const setPortion = (portion: number) => {
    const value = payBalance * portion;
    const decimals = payToken === 'USDT' ? 2 : 4;
    setTradeAmount(value > 0 ? String(Math.floor(value * 10 ** decimals) / 10 ** decimals) : '0');
  };

  let ctaLabel = mode === 'buy' ? 'Buy SBC' : 'Sell SBC';
  let ctaDisabled = false;
  if (!userFriendlyAddress) {
    ctaLabel = 'Connect wallet';
  } else if (numericAmount <= 0) {
    ctaLabel = 'Enter an amount';
    ctaDisabled = true;
  } else if (!isLoadingBalances && !isBalanceEnough) {
    ctaLabel = `Insufficient ${payToken} balance`;
    ctaDisabled = true;
  } else if (isSubmitting) {
    ctaLabel = 'Confirm in wallet…';
    ctaDisabled = true;
  }

  const ctaAction = userFriendlyAddress ? handleTrade : connectWallet;
  const accent =
    mode === 'buy'
      ? 'from-cyan-300 to-teal-400 shadow-[0_12px_40px_-8px_rgba(34,211,238,0.55)]'
      : 'from-emerald-300 to-lime-300 shadow-[0_12px_40px_-8px_rgba(52,211,153,0.55)]';

  const stats = [
    { label: 'SBC price', value: formatPrice(spotPrice, 6) },
    { label: 'Liquidity', value: formatPrice(pool.usdt, 0) },
    { label: 'SBC in pool', value: formatCompactNumber(pool.sbc, 0) },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#04111b] text-white">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-12rem] h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-cyan-400/[0.13] blur-[120px]" />
        <div className="absolute right-[-10rem] top-[20rem] h-[22rem] w-[22rem] rounded-full bg-emerald-400/[0.08] blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#04111b]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="/" className="flex min-w-0 items-center gap-2.5">
            <TokenIcon token="SBC" size="h-9 w-9" />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[15px] font-bold tracking-tight text-white">{config.projectName}</p>
              <p className="hidden text-[11px] text-slate-400 xs:block">{config.content.subheadline}</p>
            </div>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="/guide"
              aria-label="Guide"
              className="flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25v13m0-13C10.83 5.48 9.25 5 7.5 5S4.17 5.48 3 6.25v13C4.17 18.48 5.75 18 7.5 18s3.33.48 4.5 1.25m0-13C13.17 5.48 14.75 5 16.5 5c1.75 0 3.33.48 4.5 1.25v13C19.83 18.48 18.25 18 16.5 18c-1.75 0-3.33.48-4.5 1.25" />
              </svg>
              <span className="hidden sm:inline">Guide</span>
            </a>

            {userFriendlyAddress ? (
              <div className="relative" ref={walletMenuRef}>
                <button
                  onClick={() => setWalletMenuOpen((open) => !open)}
                  aria-expanded={walletMenuOpen}
                  className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] pl-3 pr-2.5 text-sm font-semibold text-white transition hover:border-cyan-300/30"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="font-mono text-[13px]">{formatAddress(userFriendlyAddress)}</span>
                  <svg className={`h-4 w-4 text-slate-400 transition ${walletMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <AnimatePresence>
                  {walletMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0a1c2a]/95 p-1.5 shadow-2xl backdrop-blur-xl"
                    >
                      <div className="px-3 py-2.5">
                        <p className="text-[11px] uppercase tracking-wider text-slate-500">Connected</p>
                        <p className="mt-1 break-all font-mono text-xs text-slate-300">{userFriendlyAddress}</p>
                      </div>
                      <button
                        onClick={copyAddress}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-200 transition hover:bg-white/5"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <rect x="9" y="9" width="11" height="11" rx="2" />
                          <path d="M5 15V6a2 2 0 0 1 2-2h9" />
                        </svg>
                        {copied ? 'Copied!' : 'Copy address'}
                      </button>
                      <button
                        onClick={disconnectWallet}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-rose-300 transition hover:bg-rose-500/10"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17l5-5-5-5M20 12H9M12 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                        </svg>
                        Disconnect
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 to-teal-400 px-4 text-sm font-bold text-slate-950 shadow-[0_8px_24px_-6px_rgba(34,211,238,0.6)] transition hover:brightness-110 active:scale-[0.98]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7H5a2 2 0 0 1 0-4h14v4M3 5v14a2 2 0 0 0 2 2h16v-5m-4-2h4v4h-4a2 2 0 0 1 0-4z" />
                </svg>
                Connect
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 pb-[calc(3rem+env(safe-area-inset-bottom))] pt-6 sm:px-6 sm:pt-10">
        {/* Price ticker */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[480px] text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live on TON
          </div>
          <h1 className="mt-4 text-[28px] font-bold leading-tight tracking-tight text-white sm:text-4xl">
            {config.content.headline}
          </h1>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">Swap SBC and USDT instantly, straight from your wallet.</p>

          <div className="mt-6 grid grid-cols-3 divide-x divide-white/[0.07] rounded-2xl border border-white/[0.08] bg-white/[0.03] py-3 backdrop-blur">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0 px-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 sm:text-[11px]">{stat.label}</p>
                <p className="mt-1 truncate text-sm font-bold tabular-nums text-white sm:text-base">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Swap card */}
        <motion.section
          id="trade-panel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-[480px]"
        >
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-2 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            {/* Mode switch */}
            <div className="relative grid grid-cols-2 rounded-[20px] bg-black/25 p-1">
              {(['buy', 'sell'] as TradeMode[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchMode(tab)}
                  className={`relative z-10 h-11 rounded-2xl text-[15px] font-bold capitalize transition-colors ${
                    mode === tab ? 'text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode === tab && (
                    <motion.span
                      layoutId="mode-pill"
                      transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                      className={`absolute inset-0 -z-10 rounded-2xl ${tab === 'buy' ? 'bg-cyan-300' : 'bg-emerald-300'}`}
                    />
                  )}
                  {tab} SBC
                </button>
              ))}
            </div>

            {/* Pay */}
            <div className="mt-2 rounded-[22px] border border-white/[0.06] bg-[#06141f]/80 p-4 transition focus-within:border-cyan-300/30 sm:p-5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-slate-400">{mode === 'buy' ? 'You pay' : 'You sell'}</span>
                <span className="text-slate-500">
                  Balance:{' '}
                  {isLoadingBalances ? (
                    <Skeleton className="h-3 w-12 align-middle" />
                  ) : (
                    <span className="tabular-nums text-slate-300">{formatCompactNumber(payBalance, 2)}</span>
                  )}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <input
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  aria-label={`Amount of ${payToken}`}
                  value={tradeAmount}
                  onChange={(event) => setTradeAmount(sanitizeAmount(event.target.value))}
                  className={`min-w-0 flex-1 bg-transparent font-bold tabular-nums tracking-tight text-white outline-none placeholder:text-slate-600 ${amountSize(tradeAmount)}`}
                  placeholder="0"
                />
                <TokenBadge token={payToken} />
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="truncate text-[13px] tabular-nums text-slate-500">≈ {formatPrice(payUsdValue, 2)}</span>
                {userFriendlyAddress && (
                  <div className="flex shrink-0 gap-1.5">
                    {[0.25, 0.5, 1].map((portion) => (
                      <button
                        key={portion}
                        onClick={() => setPortion(portion)}
                        className="h-7 rounded-lg bg-white/[0.06] px-2.5 text-xs font-semibold text-slate-300 transition hover:bg-cyan-300/15 hover:text-cyan-200"
                      >
                        {portion === 1 ? 'MAX' : `${portion * 100}%`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Flip */}
            <div className="relative z-10 -my-[18px] flex justify-center">
              <button
                onClick={() => switchMode(mode === 'buy' ? 'sell' : 'buy')}
                aria-label="Switch direction"
                className="group flex h-11 w-11 items-center justify-center rounded-2xl border-4 border-[#0b1a26] bg-[#11283a] text-cyan-200 transition hover:bg-[#163449] active:scale-95"
              >
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16m0 0-4-4m4 4 4-4M17 20V4m0 0 4 4m-4-4-4 4" />
                </svg>
              </button>
            </div>

            {/* Receive */}
            <div className="rounded-[22px] border border-white/[0.06] bg-[#06141f]/50 p-4 sm:p-5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-slate-400">You receive</span>
                <span className="text-slate-500">
                  Balance:{' '}
                  {isLoadingBalances ? (
                    <Skeleton className="h-3 w-12 align-middle" />
                  ) : (
                    <span className="tabular-nums text-slate-300">{formatCompactNumber(receiveBalance, 2)}</span>
                  )}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <p className={`min-w-0 flex-1 truncate font-bold tabular-nums tracking-tight ${amountSize(receiveText)} ${activeQuote.amountOut > 0 ? 'text-white' : 'text-slate-600'}`}>
                  {receiveText}
                </p>
                <TokenBadge token={receiveToken} />
              </div>

              <p className="mt-3 text-[13px] tabular-nums text-slate-500">≈ {formatPrice(receiveUsdValue, 2)}</p>
            </div>

            {/* Details */}
            <div className="px-3 pt-2">
              <button
                onClick={() => setShowDetails((open) => !open)}
                aria-expanded={showDetails}
                className="flex h-11 w-full items-center justify-between text-[13px] text-slate-300"
              >
                <span className="tabular-nums">
                  1 SBC = <span className="font-semibold text-white">{formatPrice(spotPrice, 6)}</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  {numericAmount > 0 && (
                    <span className={`tabular-nums ${impactTone(activeQuote.priceImpact)}`}>
                      {formatPercent(activeQuote.priceImpact)} impact
                    </span>
                  )}
                  <svg className={`h-4 w-4 transition ${showDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {showDetails && (
                  <motion.dl
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden text-[13px]"
                  >
                    <div className="space-y-2.5 border-t border-white/[0.06] pb-2 pt-3">
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Execution price</dt>
                        <dd className="tabular-nums text-slate-200">
                          {activeQuote.executionPrice ? formatPrice(activeQuote.executionPrice, 6) : '—'}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Price impact</dt>
                        <dd className={`tabular-nums ${numericAmount > 0 ? impactTone(activeQuote.priceImpact) : 'text-slate-200'}`}>
                          {numericAmount > 0 ? formatPercent(activeQuote.priceImpact) : '—'}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Network</dt>
                        <dd className="text-slate-200">TON</dd>
                      </div>
                    </div>
                  </motion.dl>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <button
              onClick={() => void ctaAction()}
              disabled={ctaDisabled}
              className={`mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-[20px] bg-gradient-to-r text-[16px] font-bold text-slate-950 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-none disabled:bg-white/[0.06] disabled:text-slate-500 disabled:shadow-none ${accent} hover:brightness-110`}
            >
              {isSubmitting && <Spinner />}
              {ctaLabel}
            </button>
          </div>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z" />
            </svg>
            Non-custodial · you sign every transaction
          </p>
        </motion.section>

        {/* Info cards */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 grid max-w-[480px] gap-3 sm:max-w-none sm:grid-cols-3"
        >
          {[
            {
              title: 'Connect',
              body: 'Link Tonkeeper or any TON wallet in one tap.',
              icon: 'M21 12V7H5a2 2 0 0 1 0-4h14v4M3 5v14a2 2 0 0 0 2 2h16v-5m-4-2h4v4h-4a2 2 0 0 1 0-4z',
            },
            {
              title: 'Get a quote',
              body: 'Live pricing from the SBC/USDT pool with impact shown upfront.',
              icon: 'M3 3v18h18M7 15l4-4 3 3 6-6',
            },
            {
              title: 'Confirm',
              body: 'Approve the transfer in your wallet — that’s it.',
              icon: 'M5 13l4 4L19 7',
            },
          ].map((step, index) => (
            <div key={step.title} className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:flex-col sm:gap-3 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  <span className="mr-1.5 text-slate-500">0{index + 1}</span>
                  {step.title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-400">{step.body}</p>
              </div>
            </div>
          ))}
        </motion.section>
      </main>

      <footer className="relative border-t border-white/[0.06] py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Senior Blockchain Company ·{' '}
        <a href="/guide" className="text-slate-400 hover:text-white">
          How it works
        </a>
      </footer>
    </div>
  );
};
