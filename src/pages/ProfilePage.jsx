import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";

export default function ProfilePage() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const syncUser = () => {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener("storage", syncUser);
    window.addEventListener("auth-changed", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("auth-changed", syncUser);
    };
  }, []);

  const roleLabel = useMemo(() => {
    if (!user?.role) return "Utente";
    if (user.role === "ADMIN") return "Admin";
    if (user.role === "CONSULENTE") return "Consulente";
    return "Cliente";
  }, [user]);

  return (
    <>
      <MainNavbar />

      <div
        style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px 0" }}
      >
        <Container>
          <Row className="g-4">
            <Col lg={4}>
              <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <div
                  style={{
                    height: "110px",
                    background:
                      "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
                  }}
                />

                <Card.Body className="text-center pt-0 px-4 pb-4">
                  <div
                    className="mx-auto rounded-circle d-flex align-items-center justify-content-center border border-4 border-white shadow-sm"
                    style={{
                      width: "96px",
                      height: "96px",
                      marginTop: "-48px",
                      background: "#e2e8f0",
                      fontSize: "32px",
                      fontWeight: "700",
                      color: "#0f172a",
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <h3
                    className="mt-3 mb-1 fw-bold"
                    style={{ color: "#0f172a" }}
                  >
                    {user ? `${user.name} ${user.surname}` : "Profilo utente"}
                  </h3>

                  <Badge
                    bg="light"
                    text="dark"
                    className="border rounded-pill px-3 py-2"
                  >
                    {roleLabel}
                  </Badge>

                  <p className="text-secondary mt-3 mb-0">
                    Gestisci il tuo account, consulta i preferiti e controlla le
                    tue attività.
                  </p>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm rounded-4 mt-4">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-3" style={{ color: "#0f172a" }}>
                    Azioni rapide
                  </h5>

                  <div className="d-grid gap-2">
                    <Button
                      as={Link}
                      to="/preferiti"
                      variant="dark"
                      className="rounded-pill"
                    >
                      Vai ai preferiti
                    </Button>

                    <Button
                      as={Link}
                      to="/cars"
                      variant="outline-dark"
                      className="rounded-pill"
                    >
                      Esplora il catalogo
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={8}>
              <Card className="border-0 shadow-sm rounded-4 mb-4">
                <Card.Body className="p-4 p-md-5">
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                    <div>
                      <h4 className="fw-bold mb-1" style={{ color: "#0f172a" }}>
                        Informazioni personali
                      </h4>
                      <p className="text-secondary mb-0">
                        Qui trovi i dati principali del tuo account.
                      </p>
                    </div>

                    <Button
                      variant="outline-dark"
                      className="rounded-pill"
                      disabled
                    >
                      Modifica profilo
                    </Button>
                  </div>

                  <ListGroup variant="flush">
                    <ListGroup.Item className="px-0 py-3 border-bottom">
                      <Row>
                        <Col sm={4} className="text-secondary">
                          Nome
                        </Col>
                        <Col sm={8} className="fw-semibold">
                          {user?.name || "-"}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item className="px-0 py-3 border-bottom">
                      <Row>
                        <Col sm={4} className="text-secondary">
                          Cognome
                        </Col>
                        <Col sm={8} className="fw-semibold">
                          {user?.surname || "-"}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item className="px-0 py-3 border-bottom">
                      <Row>
                        <Col sm={4} className="text-secondary">
                          Email
                        </Col>
                        <Col sm={8} className="fw-semibold">
                          {user?.email || "-"}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item className="px-0 py-3 border-bottom">
                      <Row>
                        <Col sm={4} className="text-secondary">
                          Telefono
                        </Col>
                        <Col sm={8} className="fw-semibold">
                          {user?.phoneNumber || "-"}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item className="px-0 py-3"></ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>

              <Row className="g-4">
                <Col md={6}>
                  <Card className="border-0 shadow-sm rounded-4 h-100">
                    <Card.Body className="p-4">
                      <h5 className="fw-bold mb-2" style={{ color: "#0f172a" }}>
                        I tuoi preferiti
                      </h5>
                      <p className="text-secondary">
                        Salva i veicoli che ti interessano e ritrovali quando
                        vuoi.
                      </p>
                      <Button
                        as={Link}
                        to="/preferiti"
                        variant="outline-dark"
                        className="rounded-pill"
                      >
                        Apri preferiti
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
