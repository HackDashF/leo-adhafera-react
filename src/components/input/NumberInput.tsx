import React from "react";
import { BaseInput } from "./BaseInput";

interface NumberInputProps
  extends Omit<React.ComponentProps<typeof BaseInput>, "type"> {
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || !isNaN(Number(value))) {
      onChange?.(e);
    }
  };

  return <BaseInput type="number" onChange={handleChange} {...props} />;
};
