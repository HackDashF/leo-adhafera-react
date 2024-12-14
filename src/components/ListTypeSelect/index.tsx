import { useEffect, useRef, useState } from "react";
import { colors } from "../../TEMP_CSS";
import { listTypeOptions } from "./options";
import { ListTypes } from "../../types/List";
import { dropdownStyles, getOptionStyles, getSelectStyles } from "./styles";
import { ChevronIcon } from "../../icons/chevron";

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
  const [hoveredOption, setHoveredOption] = useState<ListTypes | null>(null);
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={selectRef}
      style={getSelectStyles(disabled)}
      onClick={() => !disabled && setIsOpen(!isOpen)}
    >
      {isOpen ? (
        <>
          <span style={{ marginLeft: "10px" }}>
            <ChevronIcon color={colors.labelText} rotate={90} />
          </span>
        </>
      ) : (
        <>
          {Icon && (
            <span style={{ marginLeft: "10px" }}>
              <Icon color={colors.inputText} />
            </span>
          )}
        </>
      )}

      {isOpen && (
        <>
          <div
            style={{
              position: "absolute" as const,
              top: "95%",
              left: -1,
              right: -1,
              height: "40px",
              minHeight: "40px",
              // width: "100%",
              // minWidth: "100%",
              backgroundColor: colors.inputBackground,
              borderLeft: `1px solid ${colors.inputBorder}`,
              borderRight: `1px solid ${colors.inputBorder}`,
            }}
          ></div>
          <div style={dropdownStyles}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderTop: `1px solid ${colors.inputBorder}`,
                  borderTopLeftRadius: "5px",
                }}
              ></div>
              <div
                style={{
                  minWidth: "49px",
                  marginLeft: "10px",
                }}
              ></div>
            </div>
            {listTypeOptions.map((option) => (
              <div
                key={option.type}
                style={getOptionStyles(
                  option.type === value,
                  option.type === hoveredOption,
                )}
                onClick={() => {
                  onChange(option.type);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setHoveredOption(option.type)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                {option.label}
                <span style={{ marginLeft: "10px" }}>
                  <option.icon
                    color={
                      hoveredOption === option.type && option.type !== value
                        ? colors.titleText
                        : colors.labelText
                    }
                  />
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
