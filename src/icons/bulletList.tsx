import { SVGIconProps } from "../types/SVGIcon";

export const BulletListIcon = ({
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
    <circle cx="6" cy="6" r="2" fill={color} />
    <circle cx="6" cy="12" r="2" fill={color} />
    <circle cx="6" cy="18" r="2" fill={color} />

    <line
      x1="10"
      y1="6"
      x2="18"
      y2="6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="10"
      y1="12"
      x2="18"
      y2="12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="10"
      y1="18"
      x2="18"
      y2="18"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
