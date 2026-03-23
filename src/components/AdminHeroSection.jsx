import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminHeroSection() {
  return (
    <section className="admin-hero-section">
      <Container>
        <Row className="align-items-center g-4">
          <Col lg={7}>
            <div className="admin-hero-content">
              <span className="admin-hero-badge">Dashboard Admin</span>
              <h1 className="admin-hero-title">
                Gestisci veicoli, manutenzioni e vendite in un solo posto
              </h1>
              <p className="admin-hero-text">
                Crea nuovi veicoli, aggiorna disponibilità, modifica i dati,
                elimina annunci e consulta rapidamente lo storico ordini e
                finanziamenti.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Link to="/admin/history">
                  <Button className="admin-hero-btn-primary">
                    Vai allo storico
                  </Button>
                </Link>

                <a href="#admin-create-section">
                  <Button className="admin-hero-btn-secondary">
                    Crea veicolo
                  </Button>
                </a>
              </div>
            </div>
          </Col>

          <Col lg={5}>
            <div className="admin-hero-card">
              <div className="admin-hero-card-item">
                <span className="admin-hero-card-label">Veicoli</span>
                <strong>Gestione completa</strong>
              </div>

              <div className="admin-hero-card-item">
                <span className="admin-hero-card-label">Manutenzioni</span>
                <strong>Aggiunta rapida</strong>
              </div>

              <div className="admin-hero-card-item">
                <span className="admin-hero-card-label">Storico</span>
                <strong>Ordini e finanziamenti</strong>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
