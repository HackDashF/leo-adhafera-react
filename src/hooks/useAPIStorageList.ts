import { useState, useEffect, useCallback, useContext } from "react";
import { List, ListItem, ListTypes } from "../types/List";
import { AuthContext } from "../context/AuthContext";
import { listsAPI } from "../services/api/lists";
import { listItemsAPI } from "../services/api/listItems";

export const useAPIStorage = (listId: number) => {
  const [list, setList] = useState<List | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { tokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchList = async () => {
      if (!tokens?.access) return;

      try {
        const response = await listsAPI.getList(tokens.access, listId);
        if (response.success) {
          setList(response.data);
          setError(null);
        } else {
          throw new Error(response.error.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [listId, tokens?.access]);

  const updateTitle = async (title: string) => {
    if (!list || !tokens?.access) return;

    try {
      const response = await listsAPI.updateList(tokens.access, listId, {
        title,
      });
      if (response.success) {
        setList(response.data);
        setError(null);
      } else {
        throw new Error(response.error.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    }
  };

  const updateType = async (type: ListTypes) => {
    if (!list || !tokens?.access) return;

    try {
      const response = await listsAPI.updateList(tokens.access, listId, {
        type,
      });
      if (response.success) {
        setList(response.data);
        setError(null);
      } else {
        throw new Error(response.error.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    }
  };

  const addItem = async (text: string, quantity?: number) => {
    if (!list || !tokens?.access) return;

    try {
      const response = await listItemsAPI.createItem(tokens.access, listId, {
        text,
        quantity,
      });
      if (response.success) {
        setList((prev) =>
          prev
            ? {
                ...prev,
                items: [...prev.items, response.data],
              }
            : null,
        );
        setError(null);
      } else {
        throw new Error(response.error.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    }
  };

  const updateItem = useCallback(
    async (itemId: number, updates: Partial<ListItem>) => {
      if (!list || !tokens?.access) return;

      try {
        const response = await listItemsAPI.updateItem(
          tokens.access,
          listId,
          itemId,
          updates,
        );
        if (response.success) {
          setList((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              items: prev.items.map((item) =>
                item.id === itemId ? response.data : item,
              ),
            };
          });
          setError(null);
        } else {
          throw new Error(response.error.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      }
    },
    [listId, list, tokens?.access],
  );

  const deleteItem = useCallback(
    async (itemId: number) => {
      if (!list || !tokens?.access) return;

      try {
        const response = await listItemsAPI.deleteItem(
          tokens.access,
          listId,
          itemId,
        );
        if (response.success) {
          setList((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              items: prev.items.filter((item) => item.id !== itemId),
            };
          });
          setError(null);
        } else {
          throw new Error(response.error.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      }
    },
    [listId, list, tokens?.access],
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
