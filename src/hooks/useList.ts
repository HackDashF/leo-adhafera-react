import { useState, useEffect } from "react";
import { List } from "../types/List";
import { transformList } from "../types/dataMapppers/ListMapper";

export const useList = (listId: string | undefined) => {
  const [list, setList] = useState<List | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchList = async () => {
      if (!listId) {
        setError("No list ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/adhafera/lists/${listId}/`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const transformedList = transformList(data);
        setList(transformedList);
        setError(null);
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "An error occurred while fetching the list",
        );
        setList(null);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [listId]);

  return { list, loading, error };
};