import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Check if localStorage is available
  const isLocalStorageAvailable = (): boolean => {
    try {
      const testKey = '__test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  };

  // Get initial value from localStorage or use default
  const getStoredValue = useCallback((): T => {
    if (!isLocalStorageAvailable()) {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Update localStorage when state changes
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (isLocalStorageAvailable()) {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch {
        // Fail silently if localStorage is not available
      }
    },
    [key, storedValue]
  );

  // Sync with localStorage on mount and key change
  useEffect(() => {
    setStoredValue(getStoredValue());
  }, [key, getStoredValue]);

  return [storedValue, setValue];
}
