import { memo, useState } from "react";
import { ListItem as ListItemType, ListTypes } from "../../types/List";
import { TextInput } from "./../input/TextInput";
import { NumberInput } from "./../input/NumberInput";
import { Button } from "../../components/Button";
import { TrashIcon } from "../../icons/trash";
import { colors } from "../../TEMP_CSS";
import {
  listInputStyles,
  listItemCheckMarkContainer,
  listRowStyles,
} from "./styles";
import { CheckIcon } from "../../icons/check";
import { SlashedIcon } from "../../icons/slashed";

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
    const [hovered, setHover] = useState(false);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      onUpdate(id, { text: e.target.value });
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      onUpdate(id, { quantity: Number(e.target.value) });
    };

    const handleCheckToggle = () => {
      if (!editMode) {
        onUpdate(id, { checked: !checked });
      }
    };

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete(id);
    };

    return (
      <div
        role={editMode ? undefined : "button"}
        style={{
          ...listRowStyles,
          cursor: editMode ? "default" : "pointer",
        }}
        onMouseEnter={() => !editMode && setHover(true)}
        onMouseLeave={() => !editMode && setHover(false)}
        onClick={handleCheckToggle}
      >
        {listType === "Quantities" && (
          <NumberInput
            value={quantity}
            onChange={handleQuantityChange}
            disabled={!editMode}
            min={0}
            style={{
              ...listInputStyles,
              pointerEvents: editMode ? "auto" : "none",
              textAlign: "end",
            }}
            borderColor={colors.inputBackground}
          />
        )}

        <TextInput
          value={text}
          onChange={handleTextChange}
          disabled={!editMode}
          styleContainer={{
            gridColumn: listType === "Quantities" ? "2 / 6" : "1 / 6",
          }}
          style={{
            ...listInputStyles,
            textDecorationLine: checked ? "line-through" : "",
            pointerEvents: editMode ? "auto" : "none",
          }}
          borderColor={colors.inputBackground}
        />

        {editMode ? (
          <Button
            onClick={handleDelete}
            icon={TrashIcon}
            iconColor={colors.errorText}
            borderColor={colors.inputBackground}
          />
        ) : checked || hovered ? (
          <div style={listItemCheckMarkContainer}>
            {checked !== hovered ? (
              <CheckIcon color={colors.inputText} size={32} />
            ) : (
              <SlashedIcon
                icon={CheckIcon}
                iconColor={colors.inputText}
                slashColor={colors.errorText}
                backgroundColor={colors.inputBackground}
                size={32}
              />
            )}
          </div>
        ) : null}
      </div>
    );
  },
);
