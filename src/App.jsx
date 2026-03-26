import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WarrantyPage from "./pages/WarrantyPage";
import DeliveryPage from "./pages/DeliveryPage";
import AllCarsPage from "./pages/AllCarsPage";
import CarDetailPage from "./pages/CarDetailPage";
import AdminHomePage from "./pages/AdminHomePage";
import AdminHistoryPage from "./pages/AdminHistoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* pubbliche */}
      <Route path="/" element={<HomePage />} />
      <Route path="/cars" element={<AllCarsPage />} />
      <Route path="/warranty" element={<WarrantyPage />} />
      <Route path="/delivery" element={<DeliveryPage />} />
      <Route path="/cars/:id" element={<CarDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* admin protette */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminHomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/history"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminHistoryPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
