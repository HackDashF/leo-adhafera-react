import { SVGIconProps } from "../types/SVGIcon";

interface ChevronIconProps extends SVGIconProps {
  rotate?: number; // rotation in degrees
}

export const ChevronIcon = ({
  color = "black",
  size = 24,
  rotate = 0,
  ...props
}: ChevronIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: `rotate(${rotate}deg)`,
      transition: 'transform 0.2s ease-in-out'
    }}
    {...props}
  >
    <path
      d="M9 18L15 12L9 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
