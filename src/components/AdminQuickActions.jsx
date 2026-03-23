import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminQuickActions() {
  const actions = [
    {
      title: "Crea un nuovo veicolo",
      text: "Aggiungi un veicolo con dati, optional e immagini.",
      anchor: "#admin-create-section",
      button: "Apri sezione",
      isLink: false,
    },
    {
      title: "Gestisci veicoli esistenti",
      text: "Aggiorna, elimina, segna venduto o aggiungi manutenzioni.",
      anchor: "#admin-manage-section",
      button: "Apri sezione",
      isLink: false,
    },
    {
      title: "Storico ordini e finanziamenti",
      text: "Controlla vendite passate e pratiche finanziarie.",
      anchor: "/admin/history",
      button: "Vai allo storico",
      isLink: true,
    },
  ];

  return (
    <section className="admin-section-block">
      <Container>
        <Row className="g-4">
          {actions.map((action, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <Card className="admin-action-card h-100 border-0">
                <Card.Body className="p-4 d-flex flex-column">
                  <h4 className="fw-bold mb-3">{action.title}</h4>
                  <p className="text-muted flex-grow-1">{action.text}</p>

                  {action.isLink ? (
                    <Link to={action.anchor} className="text-decoration-none">
                      <Button className="w-100 admin-action-btn">
                        {action.button}
                      </Button>
                    </Link>
                  ) : (
                    <a href={action.anchor} className="text-decoration-none">
                      <Button className="w-100 admin-action-btn">
                        {action.button}
                      </Button>
                    </a>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
