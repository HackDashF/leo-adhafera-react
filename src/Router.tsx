import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthenticatedRoutes from "./pages/AuthenticatedRoutes";
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
      <Route element={<AuthenticatedRoutes />}>
        <Route path="/lists" element={<Lists />} />
        <Route path="/lists/:listID" element={<List />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;
