import { SVGIcon } from "../types/SVGIcon";

interface SlashedIconProps {
  icon: SVGIcon; // React.ComponentType<{ color: string; size: number }>;
  iconColor: string;
  slashColor?: string;
  backgroundColor: string;
  size: number;
}

export const SlashedIcon = ({
  icon: Icon,
  iconColor,
  slashColor = "red",
  backgroundColor,
  size,
}: SlashedIconProps) => {
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <Icon color={iconColor} size={size} />
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <line
          x1="10"
          y1="10"
          x2="90"
          y2="90"
          stroke={backgroundColor}
          strokeWidth="28"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="20"
          x2="80"
          y2="80"
          stroke={slashColor}
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
