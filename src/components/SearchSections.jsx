import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

export default function SearchSections() {
  const bodyTypes = [
    { name: "SUV", img: "/images/SUV2.avif", bodyTypeId: 1 },
    { name: "Station Wagon", img: "/images/SW.png", bodyTypeId: 2 },
    { name: "Berlina", img: "/images/BERLINA.jpg", bodyTypeId: 3 },
    { name: "Cabriolet", img: "/images/CABRIOLET.jpg", bodyTypeId: 4 },
    { name: "City Car", img: "/images/CITY3.avif", bodyTypeId: 5 },
    { name: "Pickup", img: "/images/PIKUP.jpg", bodyTypeId: 6 },
  ];

  const brands = [
    { name: "Mercedes", img: "/images/MERCEDES.png", brandId: 1 },
    { name: "Audi", img: "/images/AUDI.png", brandId: 3 },
    { name: "BMW", img: "/images/BMW.png", brandId: 2 },
    { name: "Volkswagen", img: "/images/VOLSKWAGEN.png", brandId: 6 },
    { name: "Fiat", img: "/images/FIAT.jpg", brandId: 4 },
    { name: "Toyota", img: "/images/TOYOTA.jpg", brandId: 7 },
  ];

  return (
    <Container className="mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4 fw-bold">Cerca per carrozzeria</h2>

      <Row className="justify-content-center g-4">
        {bodyTypes.map((b, i) => (
          <Col md={2} key={i}>
            <Link to={`/Cars?bodyTypeId=${b.bodyTypeId}`} className="card-link">
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
            <Link to={`/Cars?brandId=${b.brandId}`} className="card-link">
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
