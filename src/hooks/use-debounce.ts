import { useState, useEffect } from "react";

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T | undefined>();

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        setDebouncedValue(undefined);
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
}