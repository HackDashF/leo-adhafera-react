import { CSSProperties } from "react";
import { colors } from "../../TEMP_CSS";

export const getOptionStyles = (
  selected: boolean,
  hovered: boolean,
): CSSProperties => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "8px 16px",
  cursor: "pointer",
  backgroundColor: selected ? colors.inputSelectedBackground : "transparent",
  color: hovered && !selected ? colors.titleText : colors.labelText,
  transition: "all 0.2s ease",
});

export const getSelectStyles = (disabled: boolean): CSSProperties => ({
  position: "relative" as const,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "8px 16px",
  backgroundColor: disabled ? colors.backgound : colors.inputBackground,
  border: disabled ? "none" : `1px solid ${colors.inputBorder}`,
  borderRadius: "2px",
  opacity: disabled ? 0.7 : 1,
  cursor: disabled ? "not-allowed" : "pointer",
  transition: "all 0.2s ease",
  minWidth: "152px",
});

export const dropdownStyles: CSSProperties = {
  position: "absolute" as const,
  top: "100%",
  left: 0,
  right: 0,
  backgroundColor: colors.inputBackground,
  border: `1px solid ${colors.inputBorder}`,
  borderTop: "none",
  borderRadius: "0 0 2px 2px",
  zIndex: 1000,
};
