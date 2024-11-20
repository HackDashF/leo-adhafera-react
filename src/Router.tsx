import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Lists from "./pages/Lists";
import List from "./pages/List";
import Login from "./pages/Login";
import NewAccount from "./pages/NewAccount";
import TempList from "./pages/TempList";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/templist" element={<TempList />} />
      <Route path="/newaccount" element={<NewAccount />} />
      <Route path="/login" element={<Login />} />
      {/* jwt restricted */}
      <Route path="/lists" element={<Lists />} />
      <Route path="/list" element={<List />} />
    </Routes>
  </Router>
);

export default AppRouter;
