import { useState, useEffect, useCallback } from "react";
import {
  listFromSnakeCase,
  listItemFromSnakeCase,
} from "../types/dataMapppers/ListMapper";
import { List, ListItem, ListTypes } from "../types/List";

export const useAPIStorage = (listId: number) => {
  const [list, setList] = useState<List | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(`/api/lists/${listId}/`);
        if (!response.ok) throw new Error("Failed to fetch list");
        const data = await response.json();
        setList(listFromSnakeCase(data));
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [listId]);

  const updateTitle = async (title: string) => {
    if (!list) return;

    try {
      const response = await fetch(`/api/lists/${listId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error("Failed to update title");

      setList((prev) => (prev ? { ...prev, title } : null));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    }
  };

  const updateType = async (type: ListTypes) => {
    if (!list) return;

    try {
      const response = await fetch(`/api/lists/${listId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) throw new Error("Failed to update type");

      setList((prev) => (prev ? { ...prev, type } : null));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    }
  };

  const addItem = async (text: string) => {
    if (!list) return;

    try {
      const response = await fetch(`/api/lists/${listId}/items/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Failed to add item");

      const newItem = listItemFromSnakeCase(await response.json());
      setList((prev) =>
        prev
          ? {
              ...prev,
              items: [...prev.items, newItem],
            }
          : null,
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    }
  };

  const updateItem = useCallback(
    async (itemId: number, updates: Partial<ListItem>) => {
      if (!list) return; // maybe throw error?

      try {
        const response = await fetch(`/api/lists/${listId}/items/${itemId}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        if (!response.ok) throw new Error("Failed to update item");

        setList((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            items: prev.items.map((item) =>
              item.id === itemId ? { ...item, ...updates } : item,
            ),
          };
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      }
    },
    [listId, list],
  );

  const deleteItem = useCallback(
    async (itemId: number) => {
      if (!list) return;

      try {
        const response = await fetch(`/api/lists/${listId}/items/${itemId}/`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete item");

        setList((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            items: prev.items.filter((item) => item.id !== itemId),
          };
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      }
    },
    [listId, list],
  );

  return {
    list,
    loading,
    error,
    updateTitle,
    updateType,
    addItem,
    updateItem,
    deleteItem,
  };
};
