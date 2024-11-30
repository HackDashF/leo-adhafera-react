import { useState } from "react";
import { List, ListItem as ListItemType } from "../types/List";
import { TextInput } from "./input/TextInput";
import { Button } from "./Button";
import { PlusIcon } from "../icons/plus";
import CircularSpinner from "./CircularSpinner";
import { ListItem } from "./ListItem";

interface StorageHook {
  list: List | null;
  loading?: boolean;
  error?: Error | null;
  updateTitle: (title: string) => void | Promise<void>;
  addItem: (text: string) => void | Promise<void>;
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
  const { list, loading, error, updateTitle, addItem, updateItem, deleteItem } =
    storage;
  const [editMode, setEditMode] = useState(false);
  const [newItemText, setNewItemText] = useState("");

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim()) {
      await addItem(newItemText.trim());
      setNewItemText("");
    }
  };

  if (loading) return <CircularSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  if (!list) return <div>List not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <TextInput
          value={list.title}
          onChange={(e) => updateTitle(e.target.value)}
          disabled={!editMode}
          className="text-xl font-bold"
        />
        <Button
          onClick={() => setEditMode(!editMode)}
          label={editMode ? "Done" : "Edit"}
        />
      </div>

      {/* <form onSubmit={handleAddItem} className="flex gap-2 mb-4"> */}
      <form className="flex gap-2 mb-4">
        <TextInput
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add new item"
          className="flex-grow"
        />
        {/* <Button onClick={handleAddItem} label="Add" icon={PlusIcon} /> */}
        <Button onClick={() => handleAddItem} label="Add" icon={PlusIcon} />
      </form>

      <div className="space-y-2">
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
    </div>
  );
};
