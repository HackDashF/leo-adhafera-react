import { SVGIconProps } from "../types/SVGIcon";

export const PlusIcon = ({
  color = "black",
  size = 24,
  ...props
}: SVGIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="5"
      x2="12"
      y2="19"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
