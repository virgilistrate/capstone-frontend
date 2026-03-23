import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import MainNavbar from "../components/MainNavbar";

export default function AdminHistoryPage() {
  const [soldVehicles, setSoldVehicles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesRes, ordersRes] = await Promise.all([
          fetch("http://localhost:3003/vehicles"),
          fetch("http://localhost:3003/orders"),
        ]);

        const vehiclesData = await vehiclesRes.json();
        const ordersData = await ordersRes.json();

        setSoldVehicles(
          vehiclesData.filter((vehicle) => vehicle.sold === true),
        );
        setOrders(ordersData);
      } catch (error) {
        console.error(error);
        setErrorMessage("Errore nel caricamento dello storico.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <>
      <MainNavbar />

      <Container className="py-5">
        <div className="mb-4 text-center">
          <h1 className="fw-bold">Storico ordini e finanziamenti</h1>
          <p className="text-muted mb-0">
            Consulta veicoli venduti, ordini passati e pratiche finanziarie.
          </p>
        </div>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Row className="g-4">
          <Col xs={12} lg={6}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body>
                <h4 className="mb-3">Veicoli venduti</h4>

                {soldVehicles.length === 0 ? (
                  <p className="text-muted mb-0">Nessun veicolo venduto.</p>
                ) : (
                  soldVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="mb-3 pb-3 border-bottom">
                      <div className="d-flex justify-content-between align-items-center">
                        <strong>
                          {vehicle.brand?.name} {vehicle.model?.name}
                        </strong>
                        <Badge bg="danger">Venduta</Badge>
                      </div>
                      <div className="text-muted">{vehicle.plateNumber}</div>
                      <div>€ {vehicle.price?.toLocaleString("it-IT")}</div>
                    </div>
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={6}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body>
                <h4 className="mb-3">Ordini / finanziamenti</h4>

                {orders.length === 0 ? (
                  <p className="text-muted mb-0">Nessun ordine presente.</p>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="mb-3 pb-3 border-bottom">
                      <strong>Ordine #{order.id}</strong>
                      <div className="text-muted">
                        {order.vehicle?.brand?.name}{" "}
                        {order.vehicle?.model?.name}
                      </div>
                      <div>Cliente: {order.customerName || "N/D"}</div>
                      <div>
                        Totale: €{" "}
                        {order.totalAmount?.toLocaleString("it-IT") || "N/D"}
                      </div>
                    </div>
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
