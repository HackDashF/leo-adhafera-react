import { colors } from "../TEMP_CSS";

type CircularSpinnerProps = {
  size?: number;
  color?: string;
};

export const CircularSpinner = ({
  size = 40,
  color = colors.independantIcons,
}: CircularSpinnerProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
    style={{ animation: "spin 1s linear infinite" }}
  >
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke={color}
      strokeWidth="4"
      strokeDasharray="31.4 31.4"
      strokeLinecap="round"
    />
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        svg {
          transform-origin: center;
        }
      `}
    </style>
  </svg>
);

export default CircularSpinner;
