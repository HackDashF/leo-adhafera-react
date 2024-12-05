import React, { InputHTMLAttributes, useState } from "react";
import { colors } from "../../TEMP_CSS";

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  styleContainer?: React.CSSProperties;
  borderColor: string;
}

export const BaseInput: React.FC<BaseInputProps> = ({
  label,
  error,
  helperText,
  disabled,
  style,
  styleContainer,
  borderColor,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const textColor = disabled ? `${colors.inputText}88` : colors.inputText;

  const inputStyles: React.CSSProperties = {
    backgroundColor: colors.inputBackground,
    borderColor:
      hovered || focused
        ? colors.titleText
        : error
          ? colors.errorText
          : borderColor,
    borderWidth: "1px",
    borderStyle: "solid",
    color: textColor,
    padding: "8px",
    outline: "none",

    // for autofill
    WebkitBoxShadow: "0 0 0 30px " + colors.inputBackground + " inset",
    WebkitTextFillColor: textColor,

    transition: "all 0.2s ease-in-out",
    ...style,
  };

  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    ...styleContainer,
  };

  const labelStyle: React.CSSProperties = {
    color: disabled ? `${colors.labelText}88` : colors.labelText,
  };

  const helperStyle: React.CSSProperties = {
    color: colors.labelText,
  };

  const errorStyle: React.CSSProperties = {
    color: colors.errorText,
  };

  return (
    <div
      style={containerStyles}
      onMouseEnter={() => setHovered(!disabled && true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {label && <label style={labelStyle}>{label}</label>}
      <input disabled={disabled} style={inputStyles} {...props} />
      {error && <p style={errorStyle}>{error}</p>}
      {helperText && !error && <p style={helperStyle}>{helperText}</p>}
    </div>
  );
};
