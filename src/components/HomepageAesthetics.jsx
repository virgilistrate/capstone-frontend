import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomepageAesthetics() {
  const trustPoints = [
    {
      title: "Auto controllate",
      text: "Ogni veicolo viene verificato con controlli tecnici e documentali prima della pubblicazione.",
      icon: "✓",
    },
    {
      title: "Consegna a domicilio",
      text: "Ricevi la tua auto direttamente a casa con trasporto dedicato tramite furgone.",
      icon: "🚚",
    },
    {
      title: "Supporto dedicato",
      text: "Il nostro team ti accompagna in ogni fase: scelta, acquisto, consegna e post-vendita.",
      icon: "☎",
    },
    {
      title: "Acquisto semplice",
      text: "Naviga, confronta, salva nei preferiti e richiedi test drive in pochi click.",
      icon: "★",
    },
  ];

  const reviews = [
    {
      name: "Marco R.",
      city: "Milano",
      text: "Esperienza molto positiva. Auto arrivata in perfette condizioni e consegna puntuale. Servizio chiaro e professionale.",
      rating: 5,
    },
    {
      name: "Laura T.",
      city: "Bologna",
      text: "Ho apprezzato soprattutto la trasparenza nelle informazioni e la comodità della consegna a casa.",
      rating: 5,
    },
    {
      name: "Simone P.",
      city: "Roma",
      text: "Sito ben fatto, facile da usare e assistenza rapida. Ho prenotato il test drive senza problemi.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "500+", label: "Auto disponibili" },
    { value: "98%", label: "Clienti soddisfatti" },
    { value: "24h", label: "Supporto rapido" },
    { value: "100%", label: "Documentazione verificata" },
  ];

  return (
    <div className="homepage-aesthetics-wrapper py-5">
      <Container>
        <section className="mb-5">
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <Badge
                bg="light"
                text="dark"
                className="px-3 py-2 rounded-pill border mb-3"
              >
                Acquisto online semplice e affidabile
              </Badge>

              <h2
                className="fw-bold display-6 mb-3"
                style={{ color: "#0f172a" }}
              >
                Più fiducia, meno complicazioni.
                <br />
                La tua prossima auto arriva fino a casa.
              </h2>

              <p className="text-secondary fs-5 mb-4">
                DriveClick ti aiuta a trovare l’auto giusta in modo rapido,
                chiaro e moderno. Consulta i dettagli, confronta i veicoli,
                salva i preferiti e scegli la comodità della consegna a
                domicilio.
              </p>

              <div className="d-flex flex-wrap gap-2">
                <Button
                  as={Link}
                  to="/cars"
                  variant="dark"
                  className="rounded-pill px-4 py-2"
                >
                  Esplora le auto
                </Button>

                <Button
                  as={Link}
                  to="/delivery"
                  variant="outline-dark"
                  className="rounded-pill px-4 py-2"
                >
                  Scopri la consegna
                </Button>
              </div>
            </Col>

            <Col lg={6}>
              <div
                className="rounded-4 border overflow-hidden shadow-sm h-100 d-flex flex-column justify-content-center"
                style={{
                  minHeight: "360px",
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                }}
              >
                <div className="p-4 p-md-5 text-center">
                  <img
                    src="public/images/consegna.png"
                    alt="Consegna a domicilio"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </section>

        <section className="mb-5">
          <Row className="g-3">
            {stats.map((item, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="border-0 shadow-sm rounded-4 h-100 text-center">
                  <Card.Body className="py-4">
                    <h3 className="fw-bold mb-1" style={{ color: "#0f172a" }}>
                      {item.value}
                    </h3>
                    <p className="text-secondary mb-0">{item.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="mb-5">
          <div className="text-center mb-4">
            <Badge
              bg="light"
              text="dark"
              className="px-3 py-2 rounded-pill border mb-3"
            >
              Perché scegliere DriveClick
            </Badge>
            <h3 className="fw-bold" style={{ color: "#0f172a" }}>
              Un modo più comodo di comprare auto online
            </h3>
            <p className="text-secondary mb-0">
              Trasparenza, semplicità e consegna a casa in un’unica esperienza.
            </p>
          </div>

          <Row className="g-4">
            {trustPoints.map((item, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="border-0 shadow-sm rounded-4 h-100">
                  <Card.Body className="p-4">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                      style={{
                        width: "52px",
                        height: "52px",
                        background: "#eff6ff",
                        fontSize: "22px",
                      }}
                    >
                      {item.icon}
                    </div>

                    <h5 className="fw-bold" style={{ color: "#0f172a" }}>
                      {item.title}
                    </h5>

                    <p className="text-secondary mb-0">{item.text}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="mb-5">
          <Row className="g-4 align-items-stretch">
            <Col lg={7}>
              <Card
                className="border-0 rounded-4 shadow-sm h-100"
                style={{
                  background:
                    "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                  color: "white",
                }}
              >
                <Card.Body className="p-4 p-md-5">
                  <Badge
                    bg="light"
                    text="dark"
                    className="rounded-pill px-3 py-2 mb-3"
                  >
                    Servizio premium
                  </Badge>

                  <h3 className="fw-bold mb-3">
                    Dalla scelta del veicolo fino alla consegna sotto casa
                  </h3>

                  <p
                    className="mb-4"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    Sfoglia il catalogo, salva le auto che ti interessano,
                    richiedi informazioni o prenota un test drive. Quando trovi
                    quella giusta, pensiamo noi anche alla consegna.
                  </p>

                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      as={Link}
                      to="/warranty"
                      variant="light"
                      className="rounded-pill px-4"
                    >
                      Scopri la garanzia
                    </Button>

                    <Button
                      as={Link}
                      to="/cars"
                      variant="outline-light"
                      className="rounded-pill px-4"
                    >
                      Guarda il catalogo
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="border-0 rounded-4 shadow-sm h-100">
                <Card.Body className="p-4 p-md-5">
                  <h4 className="fw-bold mb-3" style={{ color: "#0f172a" }}>
                    Cosa apprezzano i clienti
                  </h4>

                  <ul className="list-unstyled mb-0">
                    <li className="mb-3 text-secondary">
                      ✓ Navigazione semplice e filtri chiari
                    </li>
                    <li className="mb-3 text-secondary">
                      ✓ Auto presentate con informazioni leggibili
                    </li>
                    <li className="mb-3 text-secondary">
                      ✓ Consegna comoda direttamente a domicilio
                    </li>
                    <li className="mb-0 text-secondary">
                      ✓ Assistenza rapida prima e dopo l’acquisto
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        <section className="mb-3">
          <div className="text-center mb-4">
            <Badge
              bg="light"
              text="dark"
              className="px-3 py-2 rounded-pill border mb-3"
            >
              Recensioni clienti
            </Badge>
            <h3 className="fw-bold" style={{ color: "#0f172a" }}>
              Opinioni di chi ha già scelto DriveClick
            </h3>
          </div>

          <Row className="g-4">
            {reviews.map((review, index) => (
              <Col md={6} lg={4} key={index}>
                <Card className="border-0 shadow-sm rounded-4 h-100">
                  <Card.Body className="p-4">
                    <div
                      className="mb-3"
                      style={{ color: "#f59e0b", fontSize: "18px" }}
                    >
                      {"★".repeat(review.rating)}
                    </div>

                    <p className="text-secondary mb-4">“{review.text}”</p>

                    <div className="mt-auto">
                      <h6 className="fw-bold mb-1" style={{ color: "#0f172a" }}>
                        {review.name}
                      </h6>
                      <small className="text-muted">{review.city}</small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </div>
  );
}
