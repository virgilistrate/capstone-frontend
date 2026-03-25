import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";
import VehicleCards from "../components/VehicleCards";
import ProductSearchBar from "../components/ProductSearchBar";
import VehicleFilters from "../components/VehicleFilters";
import "../App.css";

export default function AllCarsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filters = useMemo(() => {
    return {
      search: searchParams.get("search") || "",
      brandId: searchParams.get("brandId") || "",
      modelId: searchParams.get("modelId") || "",
      bodyTypeId: searchParams.get("bodyTypeId") || "",
      color: searchParams.get("color") || "",
      fuelType: searchParams.get("fuelType") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      minYear: searchParams.get("minYear") || "",
      maxYear: searchParams.get("maxYear") || "",
      maxKm: searchParams.get("maxKm") || "",
    };
  }, [searchParams]);

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const setFilters = useCallback(
    (updater) => {
      const currentFilters = {
        search: searchParams.get("search") || "",
        brandId: searchParams.get("brandId") || "",
        modelId: searchParams.get("modelId") || "",
        bodyTypeId: searchParams.get("bodyTypeId") || "",
        color: searchParams.get("color") || "",
        fuelType: searchParams.get("fuelType") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        minYear: searchParams.get("minYear") || "",
        maxYear: searchParams.get("maxYear") || "",
        maxKm: searchParams.get("maxKm") || "",
      };

      const nextFilters =
        typeof updater === "function" ? updater(currentFilters) : updater;

      const params = new URLSearchParams();

      Object.entries(nextFilters).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          params.set(key, value);
        }
      });

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentSearch = searchParams.get("search") || "";

      if (searchTerm !== currentSearch) {
        setFilters((prev) => ({
          ...prev,
          search: searchTerm,
        }));
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, searchParams, setFilters]);

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

        const url = `http://localhost:3003/vehicles/filter${
          params.toString() ? `?${params.toString()}` : ""
        }`;

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
