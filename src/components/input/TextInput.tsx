import React from "react";
import { BaseInput } from "./BaseInput";

interface TextInputProps extends React.ComponentProps<typeof BaseInput> {
  // Add any text-specific props here
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  return <BaseInput type="text" {...props} />;
};
