import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthenticatedRoutes from "./pages/AuthenticatedRoutes";
import SavedLists from "./pages/SavedLists";
import SavedList from "./pages/SavedList";
import Login from "./pages/Login";
import NewAccount from "./pages/NewAccount";
import TempList from "./pages/TempList";
import { Layout } from "./components/Layout";

const AppRouter = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/templist" element={<TempList />} />
        <Route path="/newaccount" element={<NewAccount />} />
        <Route path="/login" element={<Login />} />
        {/* jwt restricted */}
        <Route element={<AuthenticatedRoutes />}>
          <Route path="/lists" element={<SavedLists />} />
          <Route path="/lists/:listID" element={<SavedList />} />
        </Route>
      </Routes>
    </Layout>
  </Router>
);

export default AppRouter;
