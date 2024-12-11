import { useState } from "react";
import { List, ListItem as ListItemType, ListTypes } from "../../types/List";
import { TextInput } from "./../input/TextInput";
import { Button } from "./../Button";
import { PlusIcon } from "../../icons/plus";
import CircularSpinner from "./../CircularSpinner";
import { ListItem } from "./ListItem";
import { colors } from "../../TEMP_CSS";
import {
  listContainerStyles,
  listHeaderStyles,
  listInputStyles,
  listRowStyles,
  listTitleInputContainerStyles,
  listTitleInputStyles,
} from "./styles";
import { NumberInput } from "../input/NumberInput";
import { BulletListIcon } from "../../icons/bulletList";
import { QuantitiesListIcon } from "../../icons/quantitiesList";
import { ListTypeSelect } from "../ListTypeSelect";
import { ShareIcon } from "../../icons/shareIcon";

interface StorageHook {
  list: List | null;
  loading?: boolean;
  error?: Error | null;
  updateTitle: (title: string) => void | Promise<void>;
  updateType: (type: ListTypes) => void | Promise<void>;
  addItem: (text: string, qty?: number) => void | Promise<void>;
  updateItem: (
    itemId: number,
    updates: Partial<ListItemType>,
  ) => void | Promise<void>;
  deleteItem: (itemId: number) => void | Promise<void>;
}

interface BaseListProps {
  storage: StorageHook;
}

export const BaseList = ({ storage }: BaseListProps) => {
  const {
    list,
    loading,
    error,
    updateTitle,
    updateType,
    addItem,
    updateItem,
    deleteItem,
  } = storage;
  const [editMode, setEditMode] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);

  if (loading) return <CircularSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  if (!list) return <div>List not found</div>;

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim()) {
      await addItem(newItemText.trim(), newItemQuantity || 1);
      setNewItemText("");
      setNewItemQuantity(1);
    }
  };

  return (
    <div style={listContainerStyles}>
      <div style={listHeaderStyles}>
        <TextInput
          value={list.title}
          onChange={(e) => updateTitle(e.target.value)}
          disabled={!editMode}
          style={listTitleInputStyles(editMode)}
          styleContainer={listTitleInputContainerStyles}
          borderColor={colors.inputBackground}
        />
        <ListTypeSelect
          disabled={!editMode}
          value={list.type}
          onChange={updateType}
        />
        <Button
          onClick={() => setEditMode(!editMode)}
          text={editMode ? "Done" : "Edit"}
          iconColor={"white"}
        />
        {/* for temp list, need SAVE button
            for saved list, need SHARE button */}
        <Button
          onClick={() => console.log("open share modal")}
          icon={ShareIcon}
          iconColor={colors.inputText}
          disabled={editMode}
        />
      </div>

      {editMode && (
        <form onSubmit={handleAddItem} style={listRowStyles}>
          {list.type === "Quantities" && (
            <NumberInput
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(+e.target.value)}
              min={0}
              style={{
                ...listInputStyles,
                pointerEvents: editMode ? "auto" : "none",
              }}
              borderColor={colors.inputBackground}
            />
          )}
          <TextInput
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="< new item >"
            borderColor={colors.inputBackground}
            styleContainer={{
              gridColumn: list.type === "Quantities" ? "2 / 5" : "1 / 5",
            }}
            style={{
              ...listInputStyles,
              color: newItemText.length ? colors.inputText : "#454545",
              WebkitTextFillColor: newItemText.length
                ? colors.inputText
                : "#454545",
            }}
          />
          <Button
            type="submit"
            icon={PlusIcon}
            iconColor={"white"}
            borderColor={colors.inputBackground}
          />
        </form>
      )}

      {list.items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          listType={list.type}
          editMode={editMode}
          onUpdate={updateItem}
          onDelete={deleteItem}
        />
      ))}
    </div>
  );
};
