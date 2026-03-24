import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  Spinner,
  Card,
  Form,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";

const fallbackImage = "https://placehold.co/1200x900?text=No+Image";

const CarDetailPage = () => {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [downPayment, setDownPayment] = useState(3000);
  const [months, setMonths] = useState(48);
  const [rate] = useState(6.99);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`http://localhost:3003/vehicles/${id}`);

        if (!response.ok) {
          throw new Error("Errore nel recupero del veicolo");
        }

        const data = await response.json();
        setCar(data);
      } catch (err) {
        console.error(err);
        setError("Non sono riuscito a caricare il veicolo.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const images = useMemo(() => {
    if (!car?.images || car.images.length === 0) {
      return [
        {
          imageUrl: fallbackImage,
          description: "Immagine non disponibile",
        },
      ];
    }

    return car.images.map((img) => ({
      imageUrl: img.imageUrl || fallbackImage,
      description: img.description || "Immagine veicolo",
    }));
  }, [car]);

  const financedAmount = Math.max(
    (car?.price || 0) - Number(downPayment || 0),
    0,
  );
  const monthlyInstallment = useMemo(() => {
    const principal = financedAmount;
    const monthlyRate = Number(rate) / 100 / 12;
    const totalMonths = Number(months);

    if (!principal || !totalMonths) return 0;
    if (monthlyRate === 0) return principal / totalMonths;

    return (
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths))
    );
  }, [financedAmount, months, rate]);

  if (loading) {
    return (
      <>
        <MainNavbar />
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="mt-3 mb-0">Caricamento veicolo...</p>
        </div>
      </>
    );
  }

  if (error || !car) {
    return (
      <>
        <MainNavbar />
        <Container style={{ padding: "48px 12px" }}>
          <h1>Veicolo non trovato</h1>
          <p>{error || "Questo veicolo non esiste."}</p>
          <Link to="/cars">← Torna ai veicoli</Link>
        </Container>
      </>
    );
  }

  return (
    <>
      <MainNavbar />

      <Container className="car-detail-page py-4">
        <div className="mb-3">
          <Link to="/cars" className="car-detail-back-link">
            ← Torna ai veicoli
          </Link>
        </div>

        <Row className="g-4 align-items-start">
          {/* IMMAGINI GRANDI */}
          <Col xs={12} lg={8}>
            <div className="car-detail-main-image-box car-detail-main-image-box-large">
              <img
                src={images[activeImg]?.imageUrl || fallbackImage}
                alt={
                  images[activeImg]?.description ||
                  `${car.brand?.name} ${car.model?.name}`
                }
                className="car-detail-main-image"
                onError={(e) => {
                  e.currentTarget.src = fallbackImage;
                }}
              />
            </div>

            {images.length > 1 && (
              <div className="car-detail-thumbs">
                {images.map((img, idx) => (
                  <div
                    key={`${img.imageUrl}-${idx}`}
                    onClick={() => setActiveImg(idx)}
                    className={`car-detail-thumb ${activeImg === idx ? "active" : ""}`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.description || `Immagine ${idx + 1}`}
                      onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </Col>

          {/* COLONNA DESTRA */}
          <Col xs={12} lg={4}>
            <Card className="border-0 shadow-sm rounded-4 mb-4">
              <Card.Body>
                <div className="car-detail-title-row">
                  <h1 className="car-detail-title mb-0">
                    {car.brand?.name || "Brand"} {car.model?.name || "Model"}
                  </h1>
                  <Badge bg="primary">{car.fuelType || "N/D"}</Badge>
                </div>

                <p className="car-detail-subtitle mt-2 mb-3">
                  {car.bodyType?.name || "Veicolo"} ·{" "}
                  {car.color || "Colore N/D"}
                </p>

                <div className="car-detail-price-box mb-3">
                  <span className="car-detail-price-label">Prezzo</span>
                  <h2 className="car-detail-price mb-0">
                    € {car.price?.toLocaleString("it-IT")}
                  </h2>
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  <Button variant="primary">Contatta concessionaria</Button>
                  <Button variant="outline-primary">Prenota test drive</Button>
                </div>
              </Card.Body>
            </Card>

            {/* SIMULAZIONE FINANZIAMENTO */}
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body>
                <h4 className="mb-3">Simula il finanziamento</h4>

                <Form.Group className="mb-3">
                  <Form.Label>Anticipo (€)</Form.Label>
                  <Form.Control
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Durata (mesi)</Form.Label>
                  <Form.Select
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                  >
                    <option value={24}>24 mesi</option>
                    <option value={36}>36 mesi</option>
                    <option value={48}>48 mesi</option>
                    <option value={60}>60 mesi</option>
                    <option value={72}>72 mesi</option>
                    <option value={84}>84 mesi</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>TAN (%) 6.98</Form.Label>
                </Form.Group>

                <div className="finance-box">
                  <div className="finance-row">
                    <span>Importo finanziato</span>
                    <strong>
                      €{" "}
                      {financedAmount.toLocaleString("it-IT", {
                        maximumFractionDigits: 0,
                      })}
                    </strong>
                  </div>

                  <div className="finance-row finance-row-main">
                    <span>Rata mensile stimata</span>
                    <strong>
                      €{" "}
                      {monthlyInstallment.toLocaleString("it-IT", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </strong>
                  </div>
                </div>

                <p className="finance-note mt-3 mb-0">
                  Simulazione indicativa, non vincolante.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* INFORMAZIONI PRINCIPALI SOTTO */}
        <Row className="mt-4">
          <Col xs={12}>
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body>
                <h4 className="mb-3">Informazioni principali</h4>

                <Row className="g-3">
                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">Anno</span>
                      <span className="car-detail-info-value">
                        {car.yearOfConstruction}
                      </span>
                    </div>
                  </Col>

                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">Chilometri</span>
                      <span className="car-detail-info-value">
                        {car.kilometers?.toLocaleString("it-IT")} km
                      </span>
                    </div>
                  </Col>

                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">
                        Alimentazione
                      </span>
                      <span className="car-detail-info-value">
                        {car.fuelType}
                      </span>
                    </div>
                  </Col>

                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">Colore</span>
                      <span className="car-detail-info-value">{car.color}</span>
                    </div>
                  </Col>

                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">Trazione</span>
                      <span className="car-detail-info-value">
                        {car.tractiontype}
                      </span>
                    </div>
                  </Col>

                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">Potenza</span>
                      <span className="car-detail-info-value">
                        {car.enginePower} CV
                      </span>
                    </div>
                  </Col>

                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">Consumo</span>
                      <span className="car-detail-info-value">
                        {car.engineConsumption}
                      </span>
                    </div>
                  </Col>

                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">
                        Classe emissioni
                      </span>
                      <span className="car-detail-info-value">
                        {car.emissionsClass}
                      </span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* DETTAGLI TECNICI */}
        <Row className="mt-4">
          <Col xs={12}>
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body>
                <h4 className="mb-3 ">Dettagli tecnici</h4>
                <Row className="g-3">
                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">Porte</span>
                      <span className="car-detail-info-value">
                        {car.doorsNumber}
                      </span>
                    </div>
                  </Col>

                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">Posti</span>
                      <span className="car-detail-info-value">{car.seats}</span>
                    </div>
                  </Col>

                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">Cilindrata</span>
                      <span className="car-detail-info-value">
                        {car.engineCapacity}
                      </span>
                    </div>
                  </Col>

                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">CO2</span>
                      <span className="car-detail-info-value">
                        {car.co2Emissions}
                      </span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* DIMENSIONI */}
        <Row className="mt-4">
          <Col xs={12}>
            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body>
                <h4 className="mb-3">Dimensioni</h4>

                <Row className="g-3">
                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">Lunghezza</span>
                      <span className="car-detail-info-value">
                        {car.vehicleLength} mm
                      </span>
                    </div>
                  </Col>

                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">Larghezza</span>
                      <span className="car-detail-info-value">
                        {car.vehicleWidth} mm
                      </span>
                    </div>
                  </Col>

                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">Altezza</span>
                      <span className="car-detail-info-value">
                        {car.vehicleHeight} mm
                      </span>
                    </div>
                  </Col>

                  <Col xs={6} md={6} lg={3}>
                    <div className="car-detail-info-box">
                      <span className="car-detail-info-label">Bagagliaio</span>
                      <span className="car-detail-info-value">
                        {car.trunkSize} L
                      </span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {car.optionals && car.optionals.length > 0 && (
          <Row className="mt-4">
            <Col xs={12}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body>
                  <h4 className="mb-3">Optional</h4>

                  <div className="d-flex flex-wrap gap-2">
                    {car.optionals.map((optional) => (
                      <Badge
                        key={optional.id}
                        bg="light"
                        text="dark"
                        className="p-2 border"
                      >
                        {optional.name}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {car.sede && (
          <Row className="mt-4">
            <Col xs={12}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body>
                  <h4 className="mb-3">Sede</h4>
                  <p className="mb-1">
                    <strong>Nome:</strong> {car.sede.name}
                  </p>
                  <p className="mb-1">
                    <strong>Città:</strong> {car.sede.city}
                  </p>
                  <p className="mb-1">
                    <strong>Indirizzo:</strong> {car.sede.adress}
                  </p>
                  <p className="mb-1">
                    <strong>Telefono:</strong> {car.sede.phone}
                  </p>
                  <p className="mb-0">
                    <strong>Email:</strong> {car.sede.email}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default CarDetailPage;
