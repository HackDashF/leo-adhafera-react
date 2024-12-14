import { SVGIconProps } from "../types/SVGIcon";

export const EditIcon = ({
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
    {/* Pencil body */}
    <path
      d="M15.5 5.5L18.5 8.5L9 18L5 19L6 15L15.5 5.5Z"
      fill="white"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Pencil tip */}
    <path
      d="M15.5 5.5L18.5 8.5L19.5 7.5L16.5 4.5L15.5 5.5Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Eraser */}
    <path
      d="M19.5 7.5L20.5 6.5C21.3 5.7 21.3 4.3 20.5 3.5C19.7 2.7 18.3 2.7 17.5 3.5L16.5 4.5L19.5 7.5Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Edit line decoration */}
    <line
      x1="13"
      y1="8"
      x2="16"
      y2="11"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
