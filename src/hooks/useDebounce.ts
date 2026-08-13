import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // cancel if value changes before delay finishes
  }, [value, delay]);

  return debouncedValue;
}
