import { useEffect, useState } from "react";
import MainNavbar from "../components/MainNavbar";
import VehicleCards from "../components/VehicleCards";
import ProductSearchBar from "../components/ProductSearchBar";
import VehicleFilters from "../components/VehicleFilters";
import "../App.css";

export default function AllCarsPage() {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    brandId: "",
    modelId: "",
    color: "",
    fuelType: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    maxKm: "",
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: searchTerm,
    }));
  }, [searchTerm]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== "" && value !== null && value !== undefined) {
            params.append(key, value);
          }
        });

        const url = `http://localhost:3003/vehicles/filter${params.toString() ? `?${params.toString()}` : ""}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Errore nel recupero veicoli");
        }

        const data = await response.json();
        setVehicles(data);
      } catch (err) {
        console.error(err);
        setError("Non sono riuscito a caricare i veicoli.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [filters]);

  return (
    <>
      <MainNavbar />
      <ProductSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <VehicleFilters filters={filters} setFilters={setFilters} />
      <VehicleCards vehicles={vehicles} loading={loading} error={error} />
    </>
  );
}
