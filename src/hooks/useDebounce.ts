import { useState, useEffect } from "react";

// Simple debounced value hook for React Native
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (global as any).setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
