import { useMemo, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";

const fakeFavorites = [
  {
    id: 1,
    brand: "BMW",
    model: "Serie 3 Touring",
    price: 28900,
    year: 2021,
    mileage: 54000,
    fuel: "Diesel",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    brand: "Audi",
    model: "A4 Avant",
    price: 31400,
    year: 2022,
    mileage: 42000,
    fuel: "Ibrida",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    brand: "Tesla",
    model: "Model 3",
    price: 35900,
    year: 2023,
    mileage: 18000,
    fuel: "Elettrica",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
  },
];

function formatPrice(value) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getInitialFavorites() {
  const storedFavorites = localStorage.getItem("favorites");

  if (storedFavorites) {
    try {
      return JSON.parse(storedFavorites);
    } catch {
      localStorage.removeItem("favorites");
    }
  }

  localStorage.setItem("favorites", JSON.stringify(fakeFavorites));
  return fakeFavorites;
}

function FavoriteCarCard({ car, onRemove }) {
  return (
    <Card className="border-0 shadow-sm rounded-4 h-100 overflow-hidden">
      <div
        style={{ height: "220px", overflow: "hidden", background: "#e5e7eb" }}
      >
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <Card.Body className="p-4 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 className="fw-bold mb-1" style={{ color: "#0f172a" }}>
              {car.brand} {car.model}
            </h5>
            <p className="text-secondary mb-0">
              {car.year} • {car.fuel}
            </p>
          </div>

          <Badge bg="light" text="dark" className="border rounded-pill">
            Preferito
          </Badge>
        </div>

        <div className="my-3">
          <h4 className="fw-bold mb-0" style={{ color: "#0f172a" }}>
            {formatPrice(car.price)}
          </h4>
        </div>

        <div className="mb-4 text-secondary">
          <div>{car.mileage.toLocaleString("it-IT")} km</div>
        </div>

        <div className="d-flex gap-2 mt-auto">
          <Button
            as={Link}
            to={`/cars/${car.id}`}
            variant="dark"
            className="rounded-pill flex-grow-1"
          >
            Vedi dettaglio
          </Button>

          <Button
            variant="outline-danger"
            className="rounded-pill"
            onClick={() => onRemove(car.id)}
          >
            Rimuovi
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(getInitialFavorites);

  const totalFavorites = useMemo(() => favorites.length, [favorites]);

  const handleRemoveFavorite = (carId) => {
    const updated = favorites.filter((car) => car.id !== carId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <>
      <MainNavbar />

      <div
        style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px 0" }}
      >
        <Container>
          <Card className="border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
            <Card.Body className="p-4 p-md-5">
              <Row className="align-items-center g-4">
                <Col lg={8}>
                  <Badge
                    bg="light"
                    text="dark"
                    className="border rounded-pill px-3 py-2 mb-3"
                  >
                    Area personale
                  </Badge>

                  <h2 className="fw-bold mb-2" style={{ color: "#0f172a" }}>
                    I miei preferiti
                  </h2>

                  <p className="text-secondary mb-0 fs-5">
                    Qui trovi le auto che hai salvato. Confrontale, riguardale e
                    riprendi la ricerca quando vuoi.
                  </p>
                </Col>

                <Col lg={4}>
                  <Card className="border rounded-4 bg-light-subtle h-100">
                    <Card.Body className="text-center">
                      <div className="text-secondary mb-2">Veicoli salvati</div>
                      <div
                        className="fw-bold"
                        style={{ fontSize: "2rem", color: "#0f172a" }}
                      >
                        {totalFavorites}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {favorites.length === 0 ? (
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-5 text-center">
                <h4 className="fw-bold mb-3" style={{ color: "#0f172a" }}>
                  Non hai ancora preferiti
                </h4>
                <p className="text-secondary mb-4">
                  Inizia a esplorare il catalogo e salva le auto che ti
                  interessano di più.
                </p>
                <Button
                  as={Link}
                  to="/cars"
                  variant="dark"
                  className="rounded-pill px-4"
                >
                  Vai al catalogo
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Row className="g-4">
              {favorites.map((car) => (
                <Col md={6} xl={4} key={car.id}>
                  <FavoriteCarCard car={car} onRemove={handleRemoveFavorite} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>
    </>
  );
}
