import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";

export default function PurchasePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const [paymentType, setPaymentType] = useState("full");
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [homeAddress, setHomeAddress] = useState("");
  const [downPayment, setDownPayment] = useState(3000);
  const [months, setMonths] = useState(48);

  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [completedData, setCompletedData] = useState(null);

  const rate = 6.99;

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:3003/vehicles/${id}`);
        if (!response.ok) throw new Error("Errore caricamento veicolo");
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  useEffect(() => {
    if (location.state?.paymentSuccess) {
      setPurchaseCompleted(true);
      setCompletedData(location.state.purchaseData || null);
    }
  }, [location.state]);

  const financedAmount = Math.max(
    (car?.price || 0) - Number(downPayment || 0),
    0,
  );

  const monthlyInstallment = useMemo(() => {
    const principal = financedAmount;
    const monthlyRate = rate / 100 / 12;
    const totalMonths = Number(months);

    if (!principal || !totalMonths) return 0;
    if (monthlyRate === 0) return principal / totalMonths;

    return (
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths))
    );
  }, [financedAmount, months]);

  const handleGoToPayment = () => {
    const purchaseData = {
      vehicleId: car?.id,
      vehicleName: `${car?.brand?.name || ""} ${car?.model?.name || ""}`.trim(),
      price: car?.price || 0,
      paymentType,
      deliveryType,
      homeAddress: deliveryType === "delivery" ? homeAddress : "",
      downPayment: paymentType === "finance" ? Number(downPayment) : null,
      months: paymentType === "finance" ? Number(months) : null,
      monthlyInstallment:
        paymentType === "finance"
          ? Number(monthlyInstallment.toFixed(2))
          : null,
      sede: car?.sede || null,
    };

    if (deliveryType === "delivery" && !homeAddress.trim()) {
      alert("Inserisci l'indirizzo di consegna.");
      return;
    }

    navigate(`/payment/${id}`, {
      state: {
        purchaseData,
      },
    });
  };

  if (loading) {
    return (
      <>
        <MainNavbar />
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      </>
    );
  }

  if (!car) {
    return (
      <>
        <MainNavbar />
        <Container className="py-5">
          <Alert variant="danger">Veicolo non trovato.</Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <MainNavbar />

      <div
        style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px 0" }}
      >
        <Container>
          <div className="mb-3">
            <Link to={`/cars/${car.id}`}>← Torna al dettaglio auto</Link>
          </div>

          <Row className="g-4">
            <Col lg={7}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body className="p-4 p-md-5">
                  <Badge
                    bg="light"
                    text="dark"
                    className="border rounded-pill px-3 py-2 mb-3"
                  >
                    Acquisto online
                  </Badge>

                  <h2 className="fw-bold mb-2" style={{ color: "#0f172a" }}>
                    {car.brand?.name} {car.model?.name}
                  </h2>

                  <p className="text-secondary mb-4">
                    Configura il tuo acquisto e completa il pagamento.
                  </p>

                  {!purchaseCompleted ? (
                    <Form>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">
                          Modalità di pagamento
                        </Form.Label>

                        <div className="d-flex flex-column gap-3 mt-2">
                          <Card
                            className={`rounded-4 border ${paymentType === "full" ? "border-dark" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setPaymentType("full")}
                          >
                            <Card.Body>
                              <Form.Check
                                type="radio"
                                checked={paymentType === "full"}
                                onChange={() => setPaymentType("full")}
                                label="Pagamento intero"
                              />
                            </Card.Body>
                          </Card>

                          <Card
                            className={`rounded-4 border ${paymentType === "finance" ? "border-dark" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setPaymentType("finance")}
                          >
                            <Card.Body>
                              <Form.Check
                                type="radio"
                                checked={paymentType === "finance"}
                                onChange={() => setPaymentType("finance")}
                                label="Finanziamento"
                              />
                            </Card.Body>
                          </Card>
                        </div>
                      </Form.Group>

                      {paymentType === "finance" && (
                        <>
                          <Form.Group className="mb-3">
                            <Form.Label>Anticipo (€)</Form.Label>
                            <Form.Control
                              type="number"
                              value={downPayment}
                              onChange={(e) => setDownPayment(e.target.value)}
                            />
                          </Form.Group>

                          <Form.Group className="mb-4">
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
                        </>
                      )}

                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">
                          Modalità di consegna
                        </Form.Label>

                        <div className="d-flex flex-column gap-3 mt-2">
                          <Card
                            className={`rounded-4 border ${deliveryType === "pickup" ? "border-dark" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setDeliveryType("pickup")}
                          >
                            <Card.Body>
                              <Form.Check
                                type="radio"
                                checked={deliveryType === "pickup"}
                                onChange={() => setDeliveryType("pickup")}
                                label="Ritiro in sede"
                              />
                              <div className="text-secondary mt-2">
                                Ritira il veicolo direttamente in
                                concessionaria.
                              </div>
                            </Card.Body>
                          </Card>

                          <Card
                            className={`rounded-4 border ${deliveryType === "delivery" ? "border-dark" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setDeliveryType("delivery")}
                          >
                            <Card.Body>
                              <Form.Check
                                type="radio"
                                checked={deliveryType === "delivery"}
                                onChange={() => setDeliveryType("delivery")}
                                label="Consegna a domicilio"
                              />
                              <div className="text-secondary mt-2">
                                Ricevi l’auto direttamente a casa.
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      </Form.Group>

                      {deliveryType === "delivery" && (
                        <Form.Group className="mb-4">
                          <Form.Label>Indirizzo di consegna</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Inserisci via, numero civico, città"
                            value={homeAddress}
                            onChange={(e) => setHomeAddress(e.target.value)}
                          />
                        </Form.Group>
                      )}

                      <Button
                        variant="dark"
                        className="rounded-pill px-4"
                        onClick={handleGoToPayment}
                      >
                        Vai al pagamento
                      </Button>
                    </Form>
                  ) : (
                    <Alert variant="success" className="mb-0 rounded-4">
                      <h4 className="fw-bold mb-3">Acquisto completato</h4>
                      <p className="mb-2">
                        Il pagamento è stato approvato con successo per{" "}
                        <strong>{completedData?.vehicleName}</strong>.
                      </p>

                      <p className="mb-2">
                        <strong>Modalità pagamento:</strong>{" "}
                        {completedData?.paymentType === "finance"
                          ? "Finanziamento"
                          : "Pagamento intero"}
                      </p>

                      <p className="mb-2">
                        <strong>Modalità consegna:</strong>{" "}
                        {completedData?.deliveryType === "delivery"
                          ? "Consegna a domicilio"
                          : "Ritiro in sede"}
                      </p>

                      {completedData?.deliveryType === "delivery" ? (
                        <>
                          <p className="mb-2">
                            <strong>Indirizzo:</strong>{" "}
                            {completedData?.homeAddress}
                          </p>
                          <p className="mb-0">
                            La tua auto arriverà tra <strong>3 giorni</strong>.
                          </p>
                        </>
                      ) : (
                        <p className="mb-0">
                          Il veicolo sarà disponibile al ritiro in
                          concessionaria tra <strong>2 giorni</strong>.
                        </p>
                      )}
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-3" style={{ color: "#0f172a" }}>
                    Riepilogo veicolo
                  </h4>

                  <p className="mb-2">
                    <strong>Veicolo:</strong> {car.brand?.name}{" "}
                    {car.model?.name}
                  </p>
                  <p className="mb-2">
                    <strong>Prezzo:</strong> €{" "}
                    {car.price?.toLocaleString("it-IT")}
                  </p>
                  <p className="mb-2">
                    <strong>Anno:</strong> {car.yearOfConstruction}
                  </p>
                  <p className="mb-2">
                    <strong>Chilometri:</strong>{" "}
                    {car.kilometers?.toLocaleString("it-IT")} km
                  </p>

                  {paymentType === "finance" && !purchaseCompleted && (
                    <>
                      <hr />
                      <p className="mb-2">
                        <strong>Importo finanziato:</strong> €{" "}
                        {financedAmount.toLocaleString("it-IT", {
                          maximumFractionDigits: 0,
                        })}
                      </p>
                      <p className="mb-0">
                        <strong>Rata mensile stimata:</strong> €{" "}
                        {monthlyInstallment.toLocaleString("it-IT", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
