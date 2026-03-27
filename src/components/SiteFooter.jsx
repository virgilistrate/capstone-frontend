import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container>
        <Row className="gy-4 align-items-start">
          <Col md={5}>
            <div className="site-footer-brand">
              <h4 className="mb-2">DriveClick</h4>
              <p className="mb-0">
                La tua piattaforma per trovare, confrontare e acquistare auto in
                modo semplice, veloce e sicuro.
              </p>
            </div>
          </Col>

          <Col xs={6} md={3}>
            <h6 className="site-footer-title">Navigazione</h6>
            <div className="site-footer-links">
              <Link to="/">Home</Link>
              <Link to="/cars">Veicoli</Link>
              <Link to="/preferiti">Preferiti</Link>
              <Link to="/profile">Profilo</Link>
            </div>
          </Col>

          <Col xs={6} md={4}>
            <h6 className="site-footer-title">Contatti</h6>
            <div className="site-footer-info">
              <span>Email: info@driveclick.it</span>
              <span>Telefono: +39 333 123 4567</span>
              <span>Milano, Italia</span>
            </div>
          </Col>
        </Row>

        <div className="site-footer-bottom">
          <span>© {currentYear} DriveClick. Tutti i diritti riservati.</span>
          <div className="site-footer-bottom-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Termini</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
