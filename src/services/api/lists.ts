import { API_URL } from "../../config";
import { List, ListCreateFields } from "../../types/List";
import {
  SnakeCaseList,
  listFromSnakeCase,
  listCreateFieldsToSnakeCase,
} from "../../types/dataMapppers/ListMapper";
import { apiRequest } from "../../utils/apiUtils";

export const listsAPI = {
  getLists: (token: string) =>
    apiRequest<SnakeCaseList[], List[]>(
      () =>
        fetch(`${API_URL}/lists/`, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }),
      (lists) => lists.map(listFromSnakeCase),
    ),

  getList: (token: string, listId: number) =>
    apiRequest<SnakeCaseList, List>(
      () =>
        fetch(`${API_URL}/lists/${listId}`, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }),
      listFromSnakeCase,
    ),

  createList: (token: string, fields: ListCreateFields) =>
    apiRequest<SnakeCaseList, List>(
      () =>
        fetch(`${API_URL}/lists/`, {
          method: "POST",
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listCreateFieldsToSnakeCase(fields)),
        }),
      listFromSnakeCase,
    ),

  updateList: (
    token: string,
    listId: number,
    updates: Partial<ListCreateFields>,
  ) =>
    apiRequest<SnakeCaseList, List>(
      () =>
        fetch(`${API_URL}/lists/${listId}`, {
          method: "PATCH",
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            listCreateFieldsToSnakeCase(updates as ListCreateFields),
          ),
        }),
      listFromSnakeCase,
    ),

  deleteList: (token: string, listId: number) =>
    apiRequest<void>(() =>
      fetch(`${API_URL}/lists/${listId}`, {
        method: "DELETE",
        headers: {
          Authorization: `JWT ${token}`,
        },
      }),
    ),

  joinList: (token: string, shareCode: string) =>
    apiRequest<void>(() =>
      fetch(`${API_URL}/lists/join/`, {
        method: "POST",
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ share_code: shareCode }),
      }),
    ),

  getShareCode: (token: string, listId: number, username: string) =>
    apiRequest<{ share_code: string }, string>(
      () =>
        fetch(`${API_URL}/lists/${listId}/share`, {
          method: "POST",
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }),
      (data) => data.share_code,
    ),
};
