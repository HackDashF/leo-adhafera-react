import { useState, useEffect, useContext } from "react";
import { List, ListTypes } from "../types/List";
import { AuthContext } from "../context/AuthContext";
import { listsAPI } from "../services/api/lists";

export const useLists = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tokens } = useContext(AuthContext);

  const fetchLists = async () => {
    if (!tokens?.access) return;

    setLoading(true);
    const response = await listsAPI.getLists(tokens.access);

    if (response.success) {
      setLists(response.data);
      setError(null);
    } else {
      setError(response.error.message);
    }
    setLoading(false);
  };

  const deleteList = async (id: number) => {
    if (!tokens?.access) return;

    const response = await listsAPI.deleteList(tokens.access, id);
    if (!response.success) {
      setError(response.error.message);
      return;
    }

    await fetchLists(); // Refresh lists after successful delete
  };

  const createList = async (title: string, type: ListTypes) => {
    if (!tokens?.access) return null;

    const response = await listsAPI.createList(tokens.access, { title, type });
    if (!response.success) {
      setError(response.error.message);
      return null;
    }

    await fetchLists(); // Update lists in background
    return response.data.id; // Return ID for navigation
  };

  const joinList = async (shareCode: string) => {
    if (!tokens?.access) return;

    const response = await listsAPI.joinList(tokens.access, shareCode);
    if (!response.success) {
      setError(response.error.message);
      return;
    }

    await fetchLists(); // Refresh lists after joining
  };

  useEffect(() => {
    fetchLists();
  }, [tokens?.access]); // Add proper dependency

  return { lists, loading, error, deleteList, createList, joinList };
};
