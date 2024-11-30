import { memo } from "react";
import { ListItem as ListItemType, ListTypes } from "../types/List";
import { TextInput } from "./input/TextInput";
import { NumberInput } from "./input/NumberInput";
import { Button } from "../components/Button";
import { TrashIcon } from "../icons/trash";
import { XIcon } from "../icons/xmark";

interface ListItemProps {
  item: ListItemType;
  listType: ListTypes;
  editMode: boolean;
  onUpdate: (itemId: number, updates: Partial<ListItemType>) => void;
  onDelete: (itemId: number) => void;
}

export const ListItem = memo(
  ({ item, listType, editMode, onUpdate, onDelete }: ListItemProps) => {
    const { id, text, quantity, checked } = item;

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate(id, { text: e.target.value });
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate(id, { quantity: Number(e.target.value) });
    };

    const handleCheckToggle = () => {
      onUpdate(id, { checked: !checked });
    };

    const handleDelete = () => {
      onDelete(id);
    };

    return (
      <div className="flex items-center gap-2 p-2 border rounded">
        {listType === "Quantities" && (
          <NumberInput
            value={quantity}
            onChange={handleQuantityChange}
            disabled={!editMode}
            min={0}
            className="w-16"
          />
        )}

        <TextInput
          value={text}
          onChange={handleTextChange}
          disabled={!editMode}
          className={`flex-grow ${checked ? "line-through text-gray-500" : ""}`}
        />

        {editMode ? (
          <Button
            onClick={handleDelete}
            label="Delete"
            icon={TrashIcon}
            // className="text-red-600 hover:text-red-800"
          />
        ) : (
          <button
            onClick={handleCheckToggle}
            className={`w-6 h-6 border-2 rounded flex items-center justify-center
            ${checked ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
          >
            {checked && <XIcon color="white" size={16} />}
          </button>
        )}
      </div>
    );
  },
);

// ListItem.displayName = "ListItem";
