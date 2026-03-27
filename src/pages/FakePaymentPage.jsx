import { useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Badge,
} from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";

export default function FakePaymentPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const purchaseData = location.state?.purchaseData || null;

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentApproved, setPaymentApproved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const amountLabel = useMemo(() => {
    if (!purchaseData) return "€ 0";

    if (purchaseData.paymentType === "finance") {
      return new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(purchaseData.downPayment || 0);
    }

    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(purchaseData.price || 0);
  }, [purchaseData]);

  const handleFakePayment = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const token = localStorage.getItem("token");

    let user = null;
    try {
      const storedUser = localStorage.getItem("user");
      user = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Utente salvato in localStorage non valido:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setErrorMessage("Sessione non valida. Effettua di nuovo il login.");
      return;
    }

    if (!token || !user) {
      setErrorMessage(
        "Devi effettuare il login prima di completare l'acquisto.",
      );
      return;
    }

    if (user.role !== "CLIENT") {
      setErrorMessage("Solo un cliente può completare un acquisto.");
      return;
    }

    try {
      setPaymentApproved(true);

      const response = await fetch("http://localhost:3003/orders/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicleId: Number(purchaseData.vehicleId),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Errore durante la creazione dell'ordine");
      }

      const createdOrder = await response.json();

      setTimeout(() => {
        navigate(`/purchase/${id}`, {
          state: {
            paymentSuccess: true,
            purchaseData,
            orderData: createdOrder,
          },
        });
      }, 1200);
    } catch (error) {
      console.error(error);
      setPaymentApproved(false);
      setErrorMessage(
        error.message || "Non sono riuscito a completare l'acquisto.",
      );
    }
  };

  if (!purchaseData) {
    return (
      <>
        <MainNavbar />
        <Container className="py-5">
          <Alert variant="warning">
            Nessun dato di acquisto trovato. Torna alla pagina del veicolo.
          </Alert>
          <Link to={`/cars/${id}`}>← Torna al veicolo</Link>
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
            <Link to={`/purchase/${id}`}>← Torna all'acquisto</Link>
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
                    Pagamento sicuro
                  </Badge>

                  <h2 className="fw-bold mb-2" style={{ color: "#0f172a" }}>
                    Inserisci i dati della carta
                  </h2>

                  <p className="text-secondary mb-4">
                    Questa è una schermata demo: il pagamento verrà approvato
                    automaticamente.
                  </p>

                  {errorMessage && (
                    <Alert variant="danger">{errorMessage}</Alert>
                  )}

                  {!paymentApproved ? (
                    <Form onSubmit={handleFakePayment}>
                      <Form.Group className="mb-3">
                        <Form.Label>Numero carta</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Nome intestatario</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Mario Rossi"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Scadenza</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="12/29"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group className="mb-4">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        type="submit"
                        variant="dark"
                        className="rounded-pill px-4"
                      >
                        Paga ora
                      </Button>
                    </Form>
                  ) : (
                    <Alert variant="success" className="mb-0 rounded-4">
                      <h4 className="fw-bold mb-2">Pagamento approvato</h4>
                      <p className="mb-0">
                        Reindirizzamento in corso alla pagina di acquisto...
                      </p>
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-3" style={{ color: "#0f172a" }}>
                    Riepilogo pagamento
                  </h4>

                  <p className="mb-2">
                    <strong>Veicolo:</strong> {purchaseData.vehicleName}
                  </p>
                  <p className="mb-2">
                    <strong>Pagamento:</strong>{" "}
                    {purchaseData.paymentType === "finance"
                      ? "Finanziamento"
                      : "Pagamento intero"}
                  </p>
                  <p className="mb-2">
                    <strong>Consegna:</strong>{" "}
                    {purchaseData.deliveryType === "delivery"
                      ? "Consegna a domicilio"
                      : "Ritiro in sede"}
                  </p>

                  {purchaseData.deliveryType === "delivery" && (
                    <p className="mb-2">
                      <strong>Indirizzo:</strong> {purchaseData.homeAddress}
                    </p>
                  )}

                  <hr />

                  <p className="mb-0">
                    <strong>Importo da pagare ora:</strong> {amountLabel}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
