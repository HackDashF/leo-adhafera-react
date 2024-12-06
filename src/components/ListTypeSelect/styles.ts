import { CSSProperties } from "react";
import { colors } from "../../TEMP_CSS";

export const selectStyles = (
  hovered: boolean,
  disabled: boolean,
): CSSProperties => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: "8px 16px",
  backgroundColor: disabled ? colors.backgound : colors.inputBackground,
  border: disabled
    ? "none"
    : `1px solid ${hovered ? colors.titleText : colors.inputBorder}`,
  borderRadius: "2px",
  color: hovered ? "white" : colors.labelText,
  opacity: disabled ? 0.7 : 1,
  cursor: disabled ? "not-allowed" : "pointer",
  transition: "all 0.2s ease",
  minWidth: "150px",
});

export const dropdownStyles: CSSProperties = {
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  backgroundColor: colors.inputBackground,
  border: `1px solid ${colors.inputBorder}`,
  borderTop: "none",
  borderRadius: "0 0 2px 2px",
  zIndex: 1000,
};

export const optionStyles = (isSelected: boolean): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  padding: "8px 16px",
  cursor: "pointer",
  backgroundColor: isSelected ? colors.titleText : "transparent",
  color: isSelected ? "white" : colors.labelText,
  transition: "background-color 0.2s ease",
  // ":hover": {
  //   backgroundColor: colors.titleText,
  //   color: "white",
  // },
});
