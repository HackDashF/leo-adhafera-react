import React from "react";
import { BaseInput } from "./BaseInput";

interface TextInputProps
  extends Omit<React.ComponentProps<typeof BaseInput>, "type"> {
  type?: "text" | "password" | "email";
}

export const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  ...props
}) => {
  return <BaseInput type={type} {...props} />;
};
