import { useState, useEffect } from "react";

type StoredValue<T> = T | null;

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [StoredValue<T>, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<StoredValue<T>>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error retrieving data from localStorage: ${error}`);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error storing data in localStorage: ${error}`);
    }
  }, [key, storedValue]);

  const updateStoredValue = (value: T) => {
    setStoredValue(value);
  };

  return [storedValue, updateStoredValue];
}

export default useLocalStorage;
