import { Routes, Route } from "react-router";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<UserProfilePage />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
