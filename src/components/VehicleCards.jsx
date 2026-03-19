import {
  Row,
  Col,
  Card,
  Badge,
  Spinner,
  Container,
  Carousel,
} from "react-bootstrap";

function VehicleCards({ vehicles, loading, error }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3 mb-0">Caricamento veicoli...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <p className="text-danger fw-semibold mb-0">{error}</p>
      </div>
    );
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="fs-5 mb-0">Nessun veicolo trovato.</p>
      </div>
    );
  }

  return (
    <Container fluid className="vehicle-cards-container px-2 px-md-3 px-lg-2">
      <Row className="vehicle-cards-row g-3 g-md-4">
        {vehicles.map((vehicle) => {
          const images =
            vehicle.images && vehicle.images.length > 0
              ? vehicle.images
              : [
                  {
                    imageUrl: "https://placehold.co/800x500?text=No+Image",
                    description: "Immagine non disponibile",
                  },
                ];

          const hasMultipleImages = images.length > 1;

          return (
            <Col key={vehicle.id} xs={12} md={6} lg={6}>
              <Card className="vehicle-card h-100 border-0">
                <div className="vehicle-image-wrapper">
                  <Carousel
                    interval={null}
                    indicators={false}
                    controls={hasMultipleImages}
                    touch={hasMultipleImages}
                    slide={hasMultipleImages}
                    className="vehicle-carousel"
                  >
                    {images.map((img, index) => (
                      <Carousel.Item key={index}>
                        <Card.Img
                          variant="top"
                          src={img.imageUrl}
                          alt={img.description || "Immagine veicolo"}
                          className="vehicle-card-img"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>

                <Card.Body className="vehicle-card-body">
                  <div className="vehicle-header-block">
                    <h4 className="vehicle-title mb-1">
                      {vehicle.brand?.name || "Brand"}{" "}
                      {vehicle.model?.name || "Model"}
                    </h4>
                  </div>

                  <div className="price-box">
                    <span className="price-label">Prezzo</span>
                    <h3 className="price-value mb-0">
                      € {vehicle.price?.toLocaleString("it-IT")}
                    </h3>
                  </div>

                  <Row className="g-2 vehicle-info-grid">
                    <Col xs={6}>
                      <div className="info-box">
                        <span className="info-label">Anno</span>
                        <span className="info-value">
                          {vehicle.yearOfConstruction}
                        </span>
                      </div>
                    </Col>

                    <Col xs={6}>
                      <div className="info-box">
                        <span className="info-label">Chilometri</span>
                        <span className="info-value">
                          {vehicle.kilometers?.toLocaleString("it-IT")} km
                        </span>
                      </div>
                    </Col>

                    <Col xs={6}>
                      <div className="info-box">
                        <span className="info-label">Classe di Emissione</span>
                        <span className="info-value">
                          {vehicle.emissionsClass?.toLocaleString("it-IT")}
                        </span>
                      </div>
                    </Col>

                    <Col xs={6}>
                      <div className="info-box">
                        <span className="info-label">Alimentazione</span>
                        <span className="info-value">
                          {vehicle.fuelType || "N/D"}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default VehicleCards;
