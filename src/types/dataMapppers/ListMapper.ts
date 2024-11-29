import { List, ListCreateFields, ListItem, ListTypes } from "../List";

// Django API provides snake case values
// these transformers give us the data
// in our TypeScript camel case objects

// List transformers

export interface SnakeCaseList {
  id: number;
  title: string;
  list_type: ListTypes;
  created_at: Date; // need to ensure this gets parsed correctly from the Django API
  list_position: number;

  items: SnakeCaseListItem[];
  listusers: string[]; // usernames
}

export const listFromSnakeCase = (list: SnakeCaseList): List => ({
  id: list.id,
  title: list.title,
  type: list.list_type,
  createdAt: new Date(list.created_at),
  listPosition: list.list_position,

  items: list.items.map((li) => listItemFromSnakeCase(li)),
  listUsers: list.listusers, // just strings
});

export interface SnakeCaseListCreateFields {
  title: string;
  list_type?: ListTypes;
  list_position?: number;
}

export const listCreateFieldsToSnakeCase = (
  list: ListCreateFields,
): SnakeCaseListCreateFields => ({
  title: list.title,
  list_type: list.type,
  list_position: list.listPosition,
});

// ListItem transformers

export interface SnakeCaseListItem {
  id: number;
  sequence_position: number; // sequence_position | sequential list items enforced by server (avoid concurrent users overwriting eachother)
  quantity: number; // only for Quantities lists
  text: string;
  checked: boolean;
}

export const listItemFromSnakeCase = (list: SnakeCaseListItem): ListItem => ({
  id: list.id,
  sequencePosition: list.sequence_position,
  quantity: list.quantity,
  text: list.text,
  checked: list.checked,
});

// TODO TODO TODO

export const listItemToSnakeCase = (list: ListItem): SnakeCaseListItem => ({
  id: list.id,
  sequence_position: list.sequencePosition,
  quantity: list.quantity,
  text: list.text,
  checked: list.checked,
});
