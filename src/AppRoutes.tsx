import { Routes, Route } from "react-router";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/search/:city" element={<SearchPage />} />
        <Route path="/detail/:restaurantId" element={<DetailPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<UserProfilePage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/manage-restaurant" element={<ManageRestaurantPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/order-status" element={<OrderStatusPage />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
