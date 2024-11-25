import { List, ListItem, ListTypes } from "../List";

// Django API provides snake case values
// these transformers give us the data
// in our TypeScript camel case objects

/*

// Usage example with fetch
const fetchList = async (listId: number): Promise<List> => {
    const response = await fetch(`/api/lists/${listId}/`);
    const data = await response.json();
    return transformList(data);
};

*/

export interface SnakeCaseList {
  id: number;
  title: string;
  type: ListTypes; // list_type
  created_at: Date; // created_at | need to ensure this gets parsed correctly from the Django API

  items: SnakeCaseListItem[];
  // listusers
}

export interface SnakeCaseListItem {
  id: number;
  sequence_position: number; // sequence_position | sequential list items enforced by server (avoid concurrent users overwriting eachother)
  quantity: number; // only for Quantities lists
  text: string;
  checked: boolean;
}

export const transformList = (list: SnakeCaseList): List => ({
  id: list.id,
  title: list.title,
  type: list.type,
  createdAt: new Date(list.created_at),

  items: list.items.map((li) => transformListItem(li)),
});

export const transformListItem = (list: SnakeCaseListItem): ListItem => ({
  id: list.id,
  sequencePosition: list.sequence_position,
  quantity: list.quantity,
  text: list.text,
  checked: list.checked,
});
