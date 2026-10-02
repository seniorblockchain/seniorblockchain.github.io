import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { fetchWalletBalances, type WalletBalances } from '../utils/fetchWalletBalances';
import { InstallPrompt } from './InstallPrompt';

type ExchangeConfig = typeof exchangeConfig;
type TradeMode = 'buy' | 'sell';
type Token = 'SBC' | 'USDT' | 'TON';

const EMPTY_BALANCES: WalletBalances = { usdt: 0, sbc: 0, ton: 0, tonPriceUsd: 0 };

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

const TONIcon = () => (
  <svg viewBox="0 0 56 56" className="h-full w-full" aria-hidden="true">
    <circle cx="28" cy="28" r="28" fill="#0098EA" />
    <path
      fill="#fff"
      d="M37.56 15.63H18.44c-3.52 0-5.75 3.8-3.98 6.86l11.8 20.45c.77 1.34 2.7 1.34 3.47 0l11.8-20.45c1.77-3.06-.46-6.86-3.97-6.86zM26.25 36.8l-2.57-4.97-6.2-11.09c-.41-.71.1-1.62.96-1.62h7.81v17.68zm12.27-16.06-6.2 11.1-2.57 4.96V19.12h7.81c.86 0 1.37.91.96 1.62z"
    />
  </svg>
);

const TokenIcon: React.FC<{ token: Token; size?: string }> = ({ token, size = 'h-7 w-7' }) => (
  <span className={`inline-flex shrink-0 overflow-hidden rounded-full ${size} [&>svg]:h-full [&>svg]:w-full`}>
    {token === 'SBC' ? <SBCLogo /> : token === 'USDT' ? <USDTIcon /> : <TONIcon />}
  </span>
);

const TokenBadge: React.FC<{ token: Token }> = ({ token }) => (
  <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] py-1 pl-1 pr-3 xs:gap-2 xs:py-1.5 xs:pl-1.5 xs:pr-3.5">
    <TokenIcon token={token} size="h-6 w-6 xs:h-7 xs:w-7" />
    <span className="text-sm font-semibold text-white xs:text-base">{token}</span>
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
  text.length > 9 ? 'text-2xl xs:text-[34px] sm:text-[40px]' : 'text-[30px] xs:text-[34px] sm:text-[40px]';

const impactTone = (impact: number) => {
  if (impact < 0.01) return 'text-emerald-300';
  if (impact < 0.03) return 'text-amber-300';
  return 'text-rose-400';
};

type WalletPanelProps = {
  address: string;
  balances: WalletBalances;
  sbcPriceUsd: number;
  isLoading: boolean;
  updatedAt: Date | null;
  onRefresh: () => void;
};

const WalletPanel: React.FC<WalletPanelProps> = ({ address, balances, sbcPriceUsd, isLoading, updatedAt, onRefresh }) => {
  const rows: { token: Token; name: string; amount: number; digits: number; usd: number | null }[] = [
    { token: 'USDT', name: 'Tether USD', amount: balances.usdt, digits: 2, usd: balances.usdt },
    { token: 'SBC', name: 'Senior Blockchain', amount: balances.sbc, digits: 2, usd: balances.sbc * sbcPriceUsd },
    {
      token: 'TON',
      name: 'Toncoin',
      amount: balances.ton,
      digits: 4,
      usd: balances.tonPriceUsd ? balances.ton * balances.tonPriceUsd : null,
    },
  ];
  const total = rows.reduce((sum, row) => sum + (row.usd ?? 0), 0);
  const showSkeleton = isLoading && !updatedAt;

  return (
    <div className="rounded-3xl border border-white/10 bg-[#081925] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-slate-400">Your wallet</p>
          {showSkeleton ? (
            <Skeleton className="mt-2 h-8 w-36" />
          ) : (
            <p className="mt-1 text-[28px] font-bold leading-tight tracking-tight tabular-nums text-white sm:text-[32px]">
              {formatPrice(total, 2)}
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            aria-label="Refresh balances"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-slate-300 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-60"
          >
            <svg className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M5.1 15A7 7 0 0 0 18 17.7M18.9 9A7 7 0 0 0 6 6.3" />
            </svg>
          </button>
          <a
            href={`https://tonviewer.com/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on Tonviewer"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
            </svg>
          </a>
        </div>
      </div>

      <ul className="mt-4 divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#06141f]">
        {rows.map((row) => (
          <li key={row.token} className="flex items-center gap-3 px-3.5 py-3 sm:px-4">
            <TokenIcon token={row.token} size="h-9 w-9" />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold text-white">{row.token}</p>
              <p className="truncate text-xs text-slate-500">{row.name}</p>
            </div>
            <div className="text-right">
              {showSkeleton ? (
                <div className="flex flex-col items-end gap-1.5">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-12" />
                </div>
              ) : (
                <>
                  <p className="text-[15px] font-semibold tabular-nums text-white">
                    {formatCompactNumber(row.amount, row.digits)}
                  </p>
                  <p className="text-xs tabular-nums text-slate-500">{row.usd === null ? '—' : formatPrice(row.usd, 2)}</p>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {updatedAt && (
        <p className="mt-3 text-center text-[11px] text-slate-500">
          Updated {updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · SBC valued at pool price
        </p>
      )}
    </div>
  );
};

export const ExchangeShell: React.FC<{ config: ExchangeConfig }> = ({ config }) => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const [mode, setMode] = useState<TradeMode>('buy');
  const [tradeAmount, setTradeAmount] = useState<string>('250');
  const [balances, setBalances] = useState<WalletBalances>(EMPTY_BALANCES);
  const [balancesUpdatedAt, setBalancesUpdatedAt] = useState<Date | null>(null);
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

  const refreshBalances = useCallback(async () => {
    if (!userFriendlyAddress) {
      setBalances(EMPTY_BALANCES);
      setBalancesUpdatedAt(null);
      return;
    }

    setIsLoadingBalances(true);
    try {
      setBalances(await fetchWalletBalances(userFriendlyAddress));
      setBalancesUpdatedAt(new Date());
    } catch (error) {
      console.error('Error fetching balances:', error);
    } finally {
      setIsLoadingBalances(false);
    }
  }, [userFriendlyAddress]);

  // Deep links / PWA shortcuts: /?mode=sell
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('mode');
    if (requested === 'sell' || requested === 'buy') {
      setMode(requested);
      if (requested === 'sell') setTradeAmount('');
    }
  }, []);

  useEffect(() => {
    void refreshBalances();
  }, [refreshBalances]);

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
      // Give the chain time to settle, then pick up the new balances
      setTimeout(() => void refreshBalances(), 10_000);
      setTimeout(() => void refreshBalances(), 30_000);
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
      ? 'bg-emerald-500 text-white hover:bg-emerald-400 active:bg-emerald-600'
      : 'bg-rose-500 text-white hover:bg-rose-400 active:bg-rose-600';

  const stats = [
    { label: 'SBC price', value: formatPrice(spotPrice, 6) },
    { label: 'Liquidity', value: formatPrice(pool.usdt, 0) },
    { label: 'Pool SBC', value: formatCompactNumber(pool.sbc, 0) },
  ];

  return (
    <div className="relative overflow-hidden bg-[#04111b] text-white">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-12rem] h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-cyan-400/[0.13] blur-[120px]" />
        <div className="absolute right-[-10rem] top-[20rem] h-[22rem] w-[22rem] rounded-full bg-emerald-400/[0.08] blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      </div>

      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-[#04111b]/90 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <div className="safe-x mx-auto flex h-16 max-w-5xl items-center justify-between gap-3">
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
                      className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0a1c2a] p-1.5"
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
                className="flex h-10 items-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-200 active:bg-cyan-400"
              >
                <svg className="hidden h-4 w-4 xs:block" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7H5a2 2 0 0 1 0-4h14v4M3 5v14a2 2 0 0 0 2 2h16v-5m-4-2h4v4h-4a2 2 0 0 1 0-4z" />
                </svg>
                Connect
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="safe-x relative mx-auto max-w-5xl pb-12 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:pt-[calc(6.5rem+env(safe-area-inset-top))]">
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
          <p className="mt-2 text-sm text-slate-400 sm:text-base">Swap SBC and USDT instantly on the TON blockchain — straight from your wallet.</p>

          <div className="mt-6 grid grid-cols-3 divide-x divide-white/[0.07] rounded-2xl border border-white/[0.08] bg-white/[0.03] py-3 backdrop-blur">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0 px-2">
                <p className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.08em] text-slate-500 xs:tracking-[0.14em] sm:text-[11px]">{stat.label}</p>
                <p className="mt-1 truncate text-sm font-bold tabular-nums text-white sm:text-base">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Wallet balances */}
        <AnimatePresence>
          {userFriendlyAddress && (
            <motion.section
              key="wallet"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-5 max-w-[480px]"
            >
              <WalletPanel
                address={userFriendlyAddress}
                balances={balances}
                sbcPriceUsd={spotPrice}
                isLoading={isLoadingBalances}
                updatedAt={balancesUpdatedAt}
                onRefresh={() => void refreshBalances()}
              />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Swap card */}
        <motion.section
          id="trade-panel"
          style={{ scrollMarginTop: 'calc(5rem + env(safe-area-inset-top))' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-[480px]"
        >
          <div className="rounded-3xl border border-white/10 bg-[#081925] p-1.5 sm:p-2">
            {/* Mode switch */}
            <div className="relative grid grid-cols-2 rounded-2xl bg-black/25 p-1">
              {(['buy', 'sell'] as TradeMode[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchMode(tab)}
                  className={`relative z-10 h-11 rounded-xl text-[15px] font-semibold capitalize transition-colors ${
                    mode === tab ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode === tab && (
                    <motion.span
                      layoutId="mode-pill"
                      transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                      className={`absolute inset-0 -z-10 rounded-xl ${tab === 'buy' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    />
                  )}
                  {tab} SBC
                </button>
              ))}
            </div>

            {/* Pay */}
            <div className="mt-2 rounded-2xl border border-white/[0.06] bg-[#06141f] p-4 transition focus-within:border-cyan-300/30 sm:p-5">
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
                className="group flex h-11 w-11 items-center justify-center rounded-xl border-4 border-[#081925] bg-[#12293a] text-cyan-200 transition-colors hover:bg-[#183448]"
              >
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16m0 0-4-4m4 4 4-4M17 20V4m0 0 4 4m-4-4-4 4" />
                </svg>
              </button>
            </div>

            {/* Receive */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#0a1d2b] p-4 sm:p-5">
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
              className={`mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:bg-white/[0.06] disabled:text-slate-500 ${accent}`}
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

      </main>

      <InstallPrompt />
    </div>
  );
};
