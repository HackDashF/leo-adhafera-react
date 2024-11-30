import { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { Layout } from "./components/Layout";
import { AuthContext } from "./context/AuthContext";
import AuthenticatedRoutes from "./pages/AuthenticatedRoutes";
import Login from "./pages/Login";
import NewAccount from "./pages/NewAccount";
import SavedLists from "./pages/SavedLists";
import SavedList from "./pages/SavedList";
import TempList from "./pages/TempList";

const RootRedirect = () => {
  const { user, tokens } = useContext(AuthContext);
  return <Navigate to={user && tokens ? "/lists" : "/templist"} replace />;
};

const AppRouter = () => (
  <Router>
    <Layout>
      <Routes>
        <Route index element={<RootRedirect />} />
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
