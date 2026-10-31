"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hook to safely detect client-side hydration without triggering
 * cascading renders or setState-in-effect lint warnings.
 *
 * @returns {boolean} true once mounted on client, false during SSR
 */
export function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
