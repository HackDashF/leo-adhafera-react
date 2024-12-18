import React from "react";
import { colors } from "../../TEMP_CSS";

// -------------------------------------------- List

export const listContainerStyles: React.CSSProperties = {
  display: "grid",
  gridAutoRows: "auto",
  gridTemplateColumns: "80px 1fr 60px 124px 62px 62px",
};

export const listHeaderStyles: React.CSSProperties = {
  display: "grid",
  gridColumn: "1 / 7",
  gridTemplateColumns: "subgrid",
  padding: "22px 0px",
};

export const getListTitleInputStyles: (
  editMode: boolean,
) => React.CSSProperties = (editMode) =>
  editMode
    ? {
        borderColor: colors.backgound,
      }
    : {
        backgroundColor: colors.backgound,
        borderColor: colors.backgound,
        color: colors.titleText,
        WebkitBoxShadow: undefined,
        WebkitTextFillColor: colors.titleText,
      };

export const listTitleInputContainerStyles: React.CSSProperties = {
  fontSize: "1.75rem",
  gridColumn: "1 / 3",
  marginRight: "2px",
};

// -------------------------------------------- List Rows

export const listRowStyles: React.CSSProperties = {
  display: "grid",
  gridColumn: "1 / 7",
  gridTemplateColumns: "subgrid",
  backgroundColor: colors.inputBackground,
};

export const listInputStyles: React.CSSProperties = {
  fontSize: "1.5rem",
  paddingLeft: "25px",
};

export const listRowButtonStyles: React.CSSProperties = {
  borderColor: colors.inputBackground,
};

export const listItemCheckMarkContainer: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  alignContent: "center",
  justifyContent: "center",
  pointerEvents: "none",
};
