import { SVGIcon } from "../types/SVGIcon";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon?: SVGIcon;
};

// thoughts
// - could have separate icon only button
// - could add complexity to this one to handle icon only
//  - could also responsivly hide label this way...

// could move label first, icon second and flex space-between
// if we want buttons a specific width (uniform button width)

// TODO: revisit styles

export function Button({ label, icon: Icon, ...props }: ButtonProps) {
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: props.disabled ? "gray" : "blue",
        color: "white",
        cursor: props.disabled ? "not-allowed" : "pointer",
      }}
      {...props}
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
