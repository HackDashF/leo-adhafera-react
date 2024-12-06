import { useState, useCallback } from "react";
import { List, ListItem, ListTypes } from "../types/List";

interface ItemsMap {
  [key: number]: ListItem;
}

export const useLocalStorage = () => {
  const [list, setList] = useState<List>(() => {
    const saved = localStorage.getItem(`temp-list`);
    if (!saved) {
      const newList: List = {
        id: -1, // will be given an ID if saved to API later
        title: "Temporary List",
        type: "Basic",
        listPosition: 0,
        createdAt: new Date(),
        items: [],
        listUsers: [],
      };
      localStorage.setItem(`temp-list`, JSON.stringify(newList));
      return newList;
    }
    const parsedList = JSON.parse(saved);
    return {
      ...parsedList,
      createdAt: new Date(parsedList.createdAt),
    };
  });

  const [itemsMap, setItemsMap] = useState<ItemsMap>(() =>
    list.items.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item,
      }),
      {},
    ),
  );

  const saveList = (newList: List) => {
    localStorage.setItem(`temp-list`, JSON.stringify(newList));
    setList(newList);
  };

  const updateType = (type: ListTypes) => {
    saveList({ ...list, type });
  };

  const updateTitle = (title: string) => {
    saveList({ ...list, title });
  };

  const addItem = (text: string, qty?: number) => {
    const newItem: ListItem = {
      id: Date.now(),
      sequencePosition: Object.keys(itemsMap).length,
      quantity: qty || 1,
      text,
      checked: false,
    };

    const newItemsMap = { ...itemsMap, [newItem.id]: newItem };
    setItemsMap(newItemsMap);

    const newList = {
      ...list,
      items: Object.values(newItemsMap),
    };
    saveList(newList);
  };

  const updateItem = useCallback(
    (itemId: number, updates: Partial<ListItem>) => {
      setItemsMap((prev) => {
        const updated = {
          ...prev,
          [itemId]: { ...prev[itemId], ...updates },
        };

        const newList = {
          ...list,
          items: Object.values(updated),
        };
        saveList(newList);

        return updated;
      });
    },
    [list],
  );

  const deleteItem = useCallback(
    (itemId: number) => {
      setItemsMap((prev) => {
        const updated = { ...prev };
        delete updated[itemId];

        const newList = {
          ...list,
          items: Object.values(updated),
        };
        saveList(newList);

        return updated;
      });
    },
    [list],
  );

  return {
    list,
    updateTitle,
    updateType,
    addItem,
    updateItem,
    deleteItem,
  };
};
