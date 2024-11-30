import React, { InputHTMLAttributes, useState } from "react";
import { colors } from "../../TEMP_CSS";

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const BaseInput: React.FC<BaseInputProps> = ({
  label,
  error,
  helperText,
  disabled,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputStyle: React.CSSProperties = {
    backgroundColor: colors.inputBackground,
    borderColor:
      hovered || focused
        ? colors.titleText
        : error
          ? colors.errorText
          : colors.inputBorder,
    borderWidth: "1px",
    borderStyle: "solid",
    color: colors.inputText,
    padding: "8px",
    outline: "none",
    opacity: disabled ? 0.7 : 1,

    // for autofill
    WebkitBoxShadow: "0 0 0 30px " + colors.inputBackground + " inset",
    WebkitTextFillColor: colors.inputText,

    transition: "all 0.2s ease-in-out",
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    marginBottom: "1rem",
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
      style={containerStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {label && <label style={labelStyle}>{label}</label>}
      <input style={inputStyle} {...props} />
      {error && <p style={errorStyle}>{error}</p>}
      {helperText && !error && <p style={helperStyle}>{helperText}</p>}
    </div>
  );
};
