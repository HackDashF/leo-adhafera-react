import { SVGIconProps } from "../types/SVGIcon";

export const ShareIcon = ({
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
    <circle cx="18" cy="5" r="3" fill={color} />
    <circle cx="18" cy="19" r="3" fill={color} />
    <circle cx="6" cy="12" r="3" fill={color} />
    <line
      x1="6"
      y1="12"
      x2="18"
      y2="19"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="6"
      y1="12"
      x2="18"
      y2="5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
