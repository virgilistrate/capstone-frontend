import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

function CarsByCategoryPage() {
  const { categoryName } = useParams();

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
      name: "Audi Q3",
      brand: "audi",
      category: "suv",
      img: "/images/car2.jpg",
      price: "29.900€",
    },
    {
      id: 3,
      name: "Mercedes Classe C",
      brand: "mercedes",
      category: "berlina",
      img: "/images/car3.jpg",
      price: "27.900€",
    },
  ];

  const filteredCars = cars.filter((car) => car.category === categoryName);

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-capitalize">Categoria: {categoryName}</h1>

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
          <p>Nessuna auto trovata per questa categoria.</p>
        )}
      </Row>
    </Container>
  );
}

export default CarsByCategoryPage;
