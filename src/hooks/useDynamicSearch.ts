/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface Item {
  [key: string]: any;
}

function useDynamicSearch<T extends Item>(
  initialItems: T[]
): [T[], (searchTerm: string) => void] {
  const [items, setItems] = useState<T[]>(initialItems);

  const searchItems = (searchTerm: string) => {
    const filteredItems = initialItems.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setItems(filteredItems);
  };

  return [items, searchItems];
}

export default useDynamicSearch;
