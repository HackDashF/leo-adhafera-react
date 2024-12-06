import { SVGIconProps } from "../types/SVGIcon";

export const QuantitiesListIcon = ({
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
    <text
      x="10"
      y="7"
      fontSize="10"
      fill={color}
      textAnchor="end"
      dominantBaseline="middle"
      fontFamily="Arial"
    >
      3x
    </text>

    <text
      x="10"
      y="17"
      fontSize="10"
      fill={color}
      textAnchor="end"
      dominantBaseline="middle"
      fontFamily="Arial"
    >
      2x
    </text>

    <line
      x1="12"
      y1="7"
      x2="20"
      y2="7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="17"
      x2="20"
      y2="17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
