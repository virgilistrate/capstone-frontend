import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CarsByCategoryPage from "./pages/CarsByCategoryPage";
import CarsByBrandPage from "./pages/CarsByBrandPage";
import AllCarsPage from "./pages/AllCarsPage";
import AdminCreateVehiclePage from "./pages/AdminCreateVehiclePage";
import CarDetailPage from "./pages/CarDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Cars" element={<AllCarsPage />} />
      <Route path="/categoria/:categoryName" element={<CarsByCategoryPage />} />
      <Route path="/marca/:brandName" element={<CarsByBrandPage />} />
      <Route
        path="/admin/create-vehicle"
        element={<AdminCreateVehiclePage />}
      />
      <Route path="/cars/:id" element={<CarDetailPage />} />
    </Routes>
  );
}

export default App;
