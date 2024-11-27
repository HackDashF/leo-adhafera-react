import { SVGIcon } from "../types/SVGIcon";

type ButtonProps = {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  icon?: SVGIcon;
};

// thoughts
// - could have separate icon only button
// - could add complexity to this one to handle icon only
//  - could also responsivly hide label this way...

// could move label first, icon second and flex space-between
// if we want buttons a specific width (uniform button width)

// TODO: revisit styles

export function Button({ onClick, label, icon: Icon, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: disabled ? "gray" : "blue",
        color: "white",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {Icon && (
        <span style={{ marginRight: "8px" }}>
          <Icon />
        </span>
      )}
      {label}
    </button>
  );
}
