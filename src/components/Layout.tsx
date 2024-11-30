import { ReactNode } from "react";
import { colors } from "../TEMP_CSS";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: ReactNode }) => {
  const layoutStyles: React.CSSProperties = {
    backgroundColor: colors.backgound,
    minHeight: "100vh",
  };

  const contentStyles: React.CSSProperties = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "0 1rem",
    width: "100%",
  };

  return (
    <div style={layoutStyles}>
      <Navbar />
      <main style={contentStyles}>{children}</main>
    </div>
  );
};
