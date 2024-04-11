/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface Item {
  [key: string]: any;
}

type SortOrder = "asc" | "desc";

function useDynamicSort<T extends Item>(
  initialItems: T[]
): [T[], (sortKey: string, order: SortOrder) => void] {
  const [items, setItems] = useState<T[]>(initialItems);

  const dynamicSort = (property: string, order: SortOrder) => {
    const sortedItems = [...items].sort((a, b) => {
      if (order === "asc") {
        return a[property] > b[property] ? 1 : -1;
      } else {
        return a[property] < b[property] ? 1 : -1;
      }
    });
    setItems(sortedItems);
  };

  return [items, dynamicSort];
}

export default useDynamicSort;
