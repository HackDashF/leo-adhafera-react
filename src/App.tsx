import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Lists from "./pages/Lists";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/lists" element={<Lists />} />
      </Routes>
    </Router>
  );
}

export default App;
