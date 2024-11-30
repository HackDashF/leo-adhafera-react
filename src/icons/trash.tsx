import { SVGIconProps } from "../types/SVGIcon";

export const TrashIcon = ({
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
      x1="4"
      y1="6"
      x2="20"
      y2="6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="10"
      y1="3"
      x2="14"
      y2="3"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M6 6v13a2 2 0 002 2h8a2 2 0 002-2V6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <line
      x1="10"
      y1="11"
      x2="10"
      y2="17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="14"
      y1="11"
      x2="14"
      y2="17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
