import React from "react";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./Router";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
