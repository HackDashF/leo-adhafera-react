import { useState } from "react";
import { colors } from "../TEMP_CSS";
import { SVGIcon } from "../types/SVGIcon";
import CircularSpinner from "./CircularSpinner";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  icon?: SVGIcon;
  iconColor?: string;
  error?: boolean;
  success?: boolean;
  loading?: boolean;
};

// thoughts
// - could have separate icon only button
// - could add complexity to this one to handle icon only
//  - could also responsivly hide label this way...

// could move label first, icon second and flex space-between
// if we want buttons a specific width (uniform button width)

export function Button({
  disabled,
  text,
  icon: Icon,
  iconColor,
  error,
  success,
  loading,
  ...props
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);

  const inputStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 16px",
    backgroundColor: colors.inputBackground,
    border: `1px solid ${colors.inputBorder}`,
    borderRadius: "2px",
    borderColor: hovered
      ? colors.titleText
      : error
        ? colors.errorText
        : success
          ? "green"
          : colors.inputBorder,
    color: hovered ? "white" : colors.labelText,
    opacity: disabled ? 0.7 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
  };

  return (
    <button
      style={inputStyle}
      disabled={disabled || loading}
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {Icon && (
        <span
          style={{
            marginRight: text ? "8px" : undefined,
            display: "flex",
            alignItems: "center",
          }}
        >
          {loading ? <CircularSpinner /> : <Icon color={iconColor} />}
        </span>
      )}
      {text}
    </button>
  );
}
