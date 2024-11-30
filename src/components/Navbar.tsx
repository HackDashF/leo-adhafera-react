import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { colors } from "../TEMP_CSS";
import { AuthContext } from "../context/AuthContext";

export const Navbar: React.FC = () => {
  const { user } = useContext(AuthContext);

  const navStyles: React.CSSProperties = {
    backgroundColor: colors.navBackgound,
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    minHeight: "80px",
    alignItems: "center",
    color: colors.navLinkText,
  };

  // temp
  const logoStyles: React.CSSProperties = {
    color: colors.titleText,
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
  };

  const centerNavStyles: React.CSSProperties = {
    display: "flex",
    gap: "2rem",
  };

  const userNavStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  };

  const linkStyles: React.CSSProperties = {
    color: colors.navLinkText,
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background-color 0.2s",
  };

  const usernameStyles: React.CSSProperties = {
    color: colors.titleText,
  };

  return (
    <nav style={navStyles}>
      <Link to="/" style={logoStyles}>
        LOGO
      </Link>

      <div style={centerNavStyles}>
        <Link to="/templist" style={linkStyles}>
          New List
        </Link>
        <Link to="/lists" style={linkStyles}>
          My Lists
        </Link>
      </div>

      <div style={userNavStyles}>
        {user ? (
          <>
            <span style={usernameStyles}>{user.username}</span>
            <Link to="/login">Logout</Link>
          </>
        ) : (
          <Link to="/login" style={linkStyles}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
