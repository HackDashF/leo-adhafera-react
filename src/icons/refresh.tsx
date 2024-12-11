import { SVGIconProps } from "../types/SVGIcon";

export const RefreshIcon = ({
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
    <path
      d="M20 8C18.5 5.5 15.5 4 12 4C7 4 3 8 3 12C3 16 7 20 12 20C16 20 19.5 17.5 20.5 14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M16 8H20V4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
