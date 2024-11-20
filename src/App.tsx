import React from "react";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import AppRouter from "./Router";

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
