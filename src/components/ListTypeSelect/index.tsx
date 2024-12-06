import { useEffect, useRef, useState } from "react";
import { colors } from "../../TEMP_CSS";
import { XIcon } from "../../icons/xmark";
import { listTypeOptions } from "./options";
import { selectStyles, dropdownStyles, optionStyles } from "./styles";
import { ListTypes } from "../../types/List";

interface ListTypeSelectProps {
  value: ListTypes;
  onChange: (type: ListTypes) => void;
  disabled?: boolean;
}

export const ListTypeSelect = ({
  value,
  onChange,
  disabled = false,
}: ListTypeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = listTypeOptions.find((opt) => opt.type === value);
  const Icon = selectedOption?.icon;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          event.preventDefault();
          const currentIndex = listTypeOptions.findIndex(
            (opt) => opt.type === value,
          );
          const nextIndex =
            event.key === "ArrowUp"
              ? (currentIndex - 1 + listTypeOptions.length) %
                listTypeOptions.length
              : (currentIndex + 1) % listTypeOptions.length;
          onChange(listTypeOptions[nextIndex].type);
          break;
        }
        case "Enter":
        case " ":
          setIsOpen((prev) => !prev);
          break;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, value, onChange]);

  return (
    <div
      ref={selectRef}
      style={selectStyles(hovered, disabled)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !disabled && setIsOpen(!isOpen)}
      tabIndex={0}
    >
      {isOpen ? (
        // ChevronDownIcon would be better
        <XIcon color={hovered ? "white" : colors.labelText} />
      ) : (
        <>
          {Icon && (
            <span style={{ marginRight: "8px" }}>
              <Icon color={hovered ? "white" : colors.labelText} />
            </span>
          )}
          <span>{selectedOption?.label}</span>
        </>
      )}

      {isOpen && (
        <div style={dropdownStyles}>
          {listTypeOptions.map((option) => (
            <div
              key={option.type}
              style={optionStyles(option.type === value)}
              onClick={() => {
                onChange(option.type);
                setIsOpen(false);
              }}
            >
              <span style={{ marginRight: "8px" }}>
                <option.icon
                  color={option.type === value ? "white" : colors.labelText}
                />
              </span>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
