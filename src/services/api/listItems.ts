import { API_URL } from "../../config";
import { ListItem } from "../../types/List";
import {
  SnakeCaseListItem,
  listItemFromSnakeCase,
} from "../../types/dataMapppers/ListMapper";
import { apiRequest } from "../../utils/apiUtils";

export const listItemsAPI = {
  createItem: (
    token: string,
    listId: number,
    params: {
      text: string;
      quantity?: number;
    },
  ) =>
    apiRequest<SnakeCaseListItem, ListItem>(
      () =>
        fetch(`${API_URL}/lists/${listId}/items/`, {
          method: "POST",
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }),
      listItemFromSnakeCase,
    ),

  updateItem: (
    token: string,
    listId: number,
    itemId: number,
    updates: Partial<ListItem>,
  ) =>
    apiRequest<SnakeCaseListItem, ListItem>(
      () =>
        fetch(`${API_URL}/lists/${listId}/items/${itemId}/`, {
          method: "PATCH",
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        }),
      listItemFromSnakeCase,
    ),

  deleteItem: (token: string, listId: number, itemId: number) =>
    apiRequest<void>(() =>
      fetch(`${API_URL}/lists/${listId}/items/${itemId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `JWT ${token}`,
        },
      }),
    ),
};
