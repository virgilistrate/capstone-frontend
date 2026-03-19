import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

function VehicleFilters({ filters, setFilters }) {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const colors = [
    "Nero",
    "Bianco",
    "Grigio",
    "Blu",
    "Rosso",
    "Argento",
    "Verde",
    "Giallo",
    "Marrone",
  ];

  const fuelTypes = [
    "Benzina",
    "Diesel",
    "Ibrida",
    "Elettrica",
    "GPL",
    "Metano",
  ];

  const minPriceOptions = [
    5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000,
  ];
  const maxPriceOptions = [
    10000, 15000, 20000, 25000, 30000, 40000, 50000, 70000, 100000,
  ];
  const maxKmOptions = [
    10000, 20000, 30000, 50000, 75000, 100000, 125000, 150000, 200000,
  ];

  const yearOptions = [];
  for (let year = new Date().getFullYear(); year >= 2000; year--) {
    yearOptions.push(year);
  }

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:3003/brands");
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Errore caricamento brand:", error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const url = filters.brandId
          ? `http://localhost:3003/models?brandId=${filters.brandId}`
          : "http://localhost:3003/models";

        const response = await fetch(url);
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error("Errore caricamento modelli:", error);
      }
    };

    fetchModels();
  }, [filters.brandId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "brandId" ? { modelId: "" } : {}),
    }));
  };

  const resetFilters = () => {
    setFilters({
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
  };

  return (
    <Card className="filters-card border-0 shadow-sm mb-4">
      <Card.Body>
        <div className="filters-scroll-wrapper">
          <div className="filters-row-inline">
            <div className="filter-item">
              <Form.Select
                name="brandId"
                value={filters.brandId}
                onChange={handleChange}
              >
                <option value="">Tutte le marche</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="filter-item">
              <Form.Select
                name="modelId"
                value={filters.modelId}
                onChange={handleChange}
              >
                <option value="">Tutti i modelli</option>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="filter-item">
              <Form.Select
                name="color"
                value={filters.color}
                onChange={handleChange}
              >
                <option value="">Tutti i colori</option>
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="filter-item">
              <Form.Select
                name="fuelType"
                value={filters.fuelType}
                onChange={handleChange}
              >
                <option value="">Alimentazione</option>
                {fuelTypes.map((fuel) => (
                  <option key={fuel} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="filter-item">
              <Form.Select
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
              >
                <option value="">Prezzo min</option>
                {minPriceOptions.map((price) => (
                  <option key={price} value={price}>
                    € {price.toLocaleString("it-IT")}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="filter-item">
              <Form.Select
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
              >
                <option value="">Prezzo max</option>
                {maxPriceOptions.map((price) => (
                  <option key={price} value={price}>
                    € {price.toLocaleString("it-IT")}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="filter-item">
              <Form.Select
                name="minYear"
                value={filters.minYear}
                onChange={handleChange}
              >
                <option value="">Anno min</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="filter-item">
              <Form.Select
                name="maxYear"
                value={filters.maxYear}
                onChange={handleChange}
              >
                <option value="">Anno max</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="filter-item">
              <Form.Select
                name="maxKm"
                value={filters.maxKm}
                onChange={handleChange}
              >
                <option value="">Km max</option>
                {maxKmOptions.map((km) => (
                  <option key={km} value={km}>
                    {km.toLocaleString("it-IT")} km
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="filter-item filter-reset-item">
              <Button
                variant="outline-primary"
                onClick={resetFilters}
                className="filter-reset-btn"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default VehicleFilters;
