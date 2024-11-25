export type ListTypeBasic = "Basic";
export type ListTypeQuantities = "Quantities";
export type ListTypes = ListTypeBasic | ListTypeQuantities;

export interface List {
  id: number;
  title: string;
  type: ListTypes; // list_type
  createdAt: Date; // created_at | need to ensure this gets parsed correctly from the Django API

  items: ListItem[];
  // listusers
}

export interface ListItem {
  id: number;
  sequencePosition: number; // sequence_position | sequential list items enforced by server (avoid concurrent users overwriting eachother)
  quantity: number; // only for Quantities lists
  text: string;
  checked: boolean;
}
