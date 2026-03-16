import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

function CarsByBrandPage() {
  const { brandName } = useParams();

  const cars = [
    {
      id: 1,
      name: "BMW X1",
      brand: "bmw",
      category: "suv",
      img: "/images/car1.jpg",
      price: "32.900€",
    },
    {
      id: 2,
      name: "BMW Serie 3",
      brand: "bmw",
      category: "berlina",
      img: "/images/car4.jpg",
      price: "34.900€",
    },
    {
      id: 3,
      name: "Audi Q3",
      brand: "audi",
      category: "suv",
      img: "/images/car2.jpg",
      price: "29.900€",
    },
  ];

  const filteredCars = cars.filter((car) => car.brand === brandName);

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-capitalize">Marca: {brandName}</h1>

      <Row className="g-4">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <Col md={4} key={car.id}>
              <Card className="shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={car.img}
                  style={{ height: 220, objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{car.name}</Card.Title>
                  <Card.Text>{car.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Nessuna auto trovata per questa marca.</p>
        )}
      </Row>
    </Container>
  );
}

export default CarsByBrandPage;
