import { useEffect, useState } from "react";
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
import { Link, useParams } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";

export default function AppointmentPage() {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [notes, setNotes] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleAppointment = () => {
    const payload = {
      vehicleId: car?.id,
      sedeId: car?.sede?.id,
      date: appointmentDate,
      time: appointmentTime,
      notes,
    };

    console.log("Richiesta appuntamento:", payload);
    setSuccessMessage("Appuntamento richiesto con successo.");
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
                    Appuntamento in concessionaria
                  </Badge>

                  <h2 className="fw-bold mb-2" style={{ color: "#0f172a" }}>
                    Prenota una visita per {car.brand?.name} {car.model?.name}
                  </h2>

                  <p className="text-secondary mb-4">
                    Scegli giorno e orario per recarti nella sede dove si trova
                    il veicolo.
                  </p>

                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Data</Form.Label>
                      <Form.Control
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Orario</Form.Label>
                      <Form.Select
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                      >
                        <option value="">Seleziona un orario</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Note</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Inserisci eventuali richieste o domande"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      variant="dark"
                      className="rounded-pill px-4"
                      onClick={handleAppointment}
                    >
                      Conferma appuntamento
                    </Button>
                  </Form>

                  {successMessage && (
                    <Alert variant="success" className="mt-4 mb-0">
                      {successMessage}
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-3" style={{ color: "#0f172a" }}>
                    Sede dell’appuntamento
                  </h4>

                  {car.sede ? (
                    <>
                      <p className="mb-2">
                        <strong>Nome:</strong> {car.sede.name}
                      </p>
                      <p className="mb-2">
                        <strong>Città:</strong> {car.sede.city}
                      </p>
                      <p className="mb-2">
                        <strong>Indirizzo:</strong> {car.sede.adress}
                      </p>
                      <p className="mb-2">
                        <strong>Telefono:</strong> {car.sede.phone}
                      </p>
                      <p className="mb-0">
                        <strong>Email:</strong> {car.sede.email}
                      </p>
                    </>
                  ) : (
                    <p className="text-secondary mb-0">Sede non disponibile.</p>
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
