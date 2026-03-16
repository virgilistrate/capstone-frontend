import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

export default function SearchSections() {
  const bodyTypes = [
    { name: "SUV", img: "/images/SUV2.avif", slug: "suv" },
    { name: "Station Wagon", img: "/images/SW.png", slug: "station-wagon" },
    { name: "Berlina", img: "/images/BERLINA.jpg", slug: "berlina" },
    { name: "Cabriolet", img: "/images/CABRIOLET.jpg", slug: "cabriolet" },
    { name: "City Car", img: "/images/CITY3.avif", slug: "city-car" },
    { name: "Pickup", img: "/images/PIKUP.jpg", slug: "pickup" },
  ];

  const brands = [
    { name: "Mercedes", img: "/images/MERCEDES.png", slug: "mercedes" },
    { name: "Audi", img: "/images/AUDI.png", slug: "audi" },
    { name: "BMW", img: "/images/BMW.png", slug: "bmw" },
    { name: "Volkswagen", img: "/images/VOLSKWAGEN.png", slug: "volkswagen" },
    { name: "Fiat", img: "/images/FIAT.jpg", slug: "fiat" },
    { name: "Toyota", img: "/images/TOYOTA.jpg", slug: "toyota" },
  ];

  return (
    <Container className="mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4 fw-bold">Cerca per carrozzeria</h2>

      <Row className="justify-content-center g-4">
        {bodyTypes.map((b, i) => (
          <Col md={2} key={i}>
            <Link to={`/categoria/${b.slug}`} className="card-link">
              <Card className="text-center p-3 shadow-sm border-0 search-card">
                <Card.Img
                  src={b.img}
                  style={{ height: 80, objectFit: "contain" }}
                />
                <Card.Body>
                  <Card.Title style={{ fontSize: 14 }}>{b.name}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <h2 className="text-center mt-5 mb-4 fw-bold">
        Cerca per marche popolari
      </h2>

      <Row className="justify-content-center g-4">
        {brands.map((b, i) => (
          <Col md={2} key={i}>
            <Link to={`/marca/${b.slug}`} className="card-link">
              <Card className="text-center p-3 shadow-sm border-0 search-card">
                <Card.Img
                  src={b.img}
                  style={{ height: 80, objectFit: "contain" }}
                />
                <Card.Body>
                  <Card.Title style={{ fontSize: 14 }}>{b.name}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
