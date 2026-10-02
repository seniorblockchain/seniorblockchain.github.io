export type PoolState = {
  sbc: number;
  usdt: number;
};

export type QuoteResult = {
  amountOut: number;
  executionPrice: number;
  priceImpact: number;
};

const safeDivide = (numerator: number, denominator: number) => {
  if (!denominator) {
    return 0;
  }

  return numerator / denominator;
};

export const getSpotPrice = ({ sbc, usdt }: PoolState) => safeDivide(usdt, sbc);

export const getPoolValue = ({ sbc, usdt }: PoolState) => {
  const spotPrice = getSpotPrice({ sbc, usdt });

  return usdt + sbc * spotPrice;
};

export const getBuyQuote = (pool: PoolState, usdtIn: number): QuoteResult => {
  if (usdtIn <= 0 || pool.sbc <= 0 || pool.usdt <= 0) {
    return { amountOut: 0, executionPrice: 0, priceImpact: 0 };
  }

  const invariant = pool.sbc * pool.usdt;
  const nextUsdtReserve = pool.usdt + usdtIn;
  const nextSbcReserve = invariant / nextUsdtReserve;
  const amountOut = Math.max(pool.sbc - nextSbcReserve, 0);
  const executionPrice = safeDivide(usdtIn, amountOut);
  const spotPrice = getSpotPrice(pool);

  return {
    amountOut,
    executionPrice,
    priceImpact: spotPrice ? Math.max((executionPrice - spotPrice) / spotPrice, 0) : 0,
  };
};

export const getSellQuote = (pool: PoolState, sbcIn: number): QuoteResult => {
  if (sbcIn <= 0 || pool.sbc <= 0 || pool.usdt <= 0) {
    return { amountOut: 0, executionPrice: 0, priceImpact: 0 };
  }

  const invariant = pool.sbc * pool.usdt;
  const nextSbcReserve = pool.sbc + sbcIn;
  const nextUsdtReserve = invariant / nextSbcReserve;
  const amountOut = Math.max(pool.usdt - nextUsdtReserve, 0);
  const executionPrice = safeDivide(amountOut, sbcIn);
  const spotPrice = getSpotPrice(pool);

  return {
    amountOut,
    executionPrice,
    priceImpact: spotPrice ? Math.max((spotPrice - executionPrice) / spotPrice, 0) : 0,
  };
};

export const buildChartSeries = (spotPrice: number, samples: number, volatility: number) => {
  const totalSamples = Math.max(samples, 8);

  return Array.from({ length: totalSamples }, (_, index) => {
    const wave = Math.sin(index * 0.7) * volatility;
    const drift = (index / (totalSamples - 1) - 0.5) * volatility * 0.6;

    return Number((spotPrice * (1 + wave + drift)).toFixed(6));
  });
};

export const formatCompactNumber = (value: number, digits = 2) =>
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  }).format(value);

export const formatPrice = (value: number, digits = 4) =>
  `$${new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)}`;

export const formatPercent = (value: number) =>
  `${new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value * 100)}%`;