import { SVGIconProps } from "../types/SVGIcon";

export const ProfileIcon = ({
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
    {/* Head */}
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" fill="none" />
    {/* Body */}
    <path
      d="M6 21C6 17 8.7 14 12 14C15.3 14 18 17 18 21"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);
