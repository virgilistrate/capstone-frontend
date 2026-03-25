import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WarrantyPage from "./pages/WarrantyPage";
import DeliveryPage from "./pages/DeliveryPage";
import AllCarsPage from "./pages/AllCarsPage";
import AdminCreateVehiclePage from "./components/AdminCreateVehicleSection";
import CarDetailPage from "./pages/CarDetailPage";
import AdminHomePage from "./pages/AdminHomePage";
import AdminHistoryPage from "./pages/AdminHistoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Cars" element={<AllCarsPage />} />
      <Route path="/warranty" element={<WarrantyPage />} />
      <Route path="/delivery" element={<DeliveryPage />} />
      <Route path="/admin" element={<AdminHomePage />} />
      <Route path="/admin/history" element={<AdminHistoryPage />} />
      <Route path="/cars/:id" element={<CarDetailPage />} />
    </Routes>
  );
}

export default App;
