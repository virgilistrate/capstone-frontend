import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CarsByCategoryPage from "./pages/CarsByCategoryPage";
import CarsByBrandPage from "./pages/CarsByBrandPage";
import AllCarsPage from "./pages/AllCarsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/allCars" element={<AllCarsPage />} />
      <Route path="/categoria/:categoryName" element={<CarsByCategoryPage />} />
      <Route path="/marca/:brandName" element={<CarsByBrandPage />} />
    </Routes>
  );
}

export default App;
