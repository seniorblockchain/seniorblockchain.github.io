import { useEffect, useState } from 'react';
import type { PoolState } from './exchangeMath';
import { subscribePool } from './livePool';

export function useLivePool(initialPool: PoolState): PoolState {
  const [pool, setPool] = useState(initialPool);
  useEffect(() => subscribePool(setPool), []);
  return pool;
}
