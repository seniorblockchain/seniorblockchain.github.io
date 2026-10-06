import type { APIRoute } from 'astro';
import exchangeConfig from '../data/exchange-config.json';

export const prerender = true;

// Generated from the same config as the initial page on every deployment.
export const GET: APIRoute = () => new Response(JSON.stringify({ pool: exchangeConfig.pool }), {
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});
