import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
  Form,
  Modal,
} from "react-bootstrap";

export default function AdminManageVehiclesSection() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const [maintenanceData, setMaintenanceData] = useState({
    title: "",
    description: "",
    cost: "",
    date: "",
  });

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3003/vehicles");

      if (!response.ok) {
        throw new Error("Errore nel recupero veicoli");
      }

      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Non sono riuscito a caricare i veicoli.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (vehicleId) => {
    const confirmDelete = window.confirm(
      "Vuoi davvero eliminare questo veicolo?",
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3003/vehicles/${vehicleId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione");
      }

      setSuccessMessage("Veicolo eliminato con successo.");
      fetchVehicles();
    } catch (error) {
      console.error(error);
      setErrorMessage("Errore durante l'eliminazione del veicolo.");
    }
  };

  const handleToggleSold = async (vehicle) => {
    try {
      const response = await fetch(
        `http://localhost:3003/vehicles/${vehicle.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sold: !vehicle.sold,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Errore aggiornamento stato veicolo");
      }

      setSuccessMessage("Stato veicolo aggiornato.");
      fetchVehicles();
    } catch (error) {
      console.error(error);
      setErrorMessage("Non sono riuscito ad aggiornare lo stato del veicolo.");
    }
  };

  const openMaintenanceModal = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setMaintenanceData({
      title: "",
      description: "",
      cost: "",
      date: "",
    });
    setShowMaintenanceModal(true);
  };

  const handleMaintenanceSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3003/maintenances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleId: selectedVehicleId,
          title: maintenanceData.title,
          description: maintenanceData.description,
          cost: Number(maintenanceData.cost),
          date: maintenanceData.date,
        }),
      });

      if (!response.ok) {
        throw new Error("Errore nel salvataggio manutenzione");
      }

      setShowMaintenanceModal(false);
      setSuccessMessage("Manutenzione aggiunta con successo.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Non sono riuscito ad aggiungere la manutenzione.");
    }
  };

  return (
    <section id="admin-manage-section" className="admin-section-block pb-5">
      <Container>
        <Card className="admin-section-card border-0">
          <Card.Body className="p-4 p-md-5">
            <div className="mb-4">
              <h2 className="fw-bold mb-1">Gestisci veicoli</h2>
              <p className="text-muted mb-0">
                Modifica disponibilità, elimina veicoli e registra manutenzioni.
              </p>
            </div>

            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            {loading ? (
              <div className="text-center py-4">
                <Spinner animation="border" />
              </div>
            ) : (
              <Row className="g-4">
                {vehicles.map((vehicle) => (
                  <Col xs={12} md={6} lg={4} key={vehicle.id}>
                    <Card className="h-100 border-0 shadow-sm rounded-4">
                      {vehicle.images && vehicle.images.length > 0 && (
                        <Card.Img
                          variant="top"
                          src={vehicle.images[0].imageUrl}
                          className="admin-vehicle-card-img"
                        />
                      )}

                      <Card.Body className="d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="fw-bold mb-0">
                            {vehicle.brand?.name} {vehicle.model?.name}
                          </h5>

                          <Badge bg={vehicle.sold ? "danger" : "success"}>
                            {vehicle.sold ? "Venduta" : "Disponibile"}
                          </Badge>
                        </div>

                        <p className="text-muted mb-2">{vehicle.plateNumber}</p>
                        <p className="mb-1">
                          <strong>Prezzo:</strong> €{" "}
                          {vehicle.price?.toLocaleString("it-IT")}
                        </p>
                        <p className="mb-1">
                          <strong>Anno:</strong> {vehicle.yearOfConstruction}
                        </p>
                        <p className="mb-3">
                          <strong>Km:</strong>{" "}
                          {vehicle.kilometers?.toLocaleString("it-IT")} km
                        </p>

                        <div className="mt-auto d-flex flex-column gap-2">
                          <Button
                            variant={
                              vehicle.sold
                                ? "outline-success"
                                : "outline-danger"
                            }
                            onClick={() => handleToggleSold(vehicle)}
                          >
                            {vehicle.sold
                              ? "Segna come disponibile"
                              : "Segna come venduta"}
                          </Button>

                          <Button
                            variant="outline-primary"
                            onClick={() => openMaintenanceModal(vehicle.id)}
                          >
                            Aggiungi manutenzione
                          </Button>

                          <Button
                            variant="outline-danger"
                            onClick={() => handleDelete(vehicle.id)}
                          >
                            Elimina veicolo
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Card.Body>
        </Card>

        <Modal
          show={showMaintenanceModal}
          onHide={() => setShowMaintenanceModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Aggiungi manutenzione</Modal.Title>
          </Modal.Header>

          <Form onSubmit={handleMaintenanceSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Titolo</Form.Label>
                <Form.Control
                  value={maintenanceData.title}
                  onChange={(e) =>
                    setMaintenanceData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descrizione</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={maintenanceData.description}
                  onChange={(e) =>
                    setMaintenanceData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Costo</Form.Label>
                <Form.Control
                  type="number"
                  value={maintenanceData.cost}
                  onChange={(e) =>
                    setMaintenanceData((prev) => ({
                      ...prev,
                      cost: e.target.value,
                    }))
                  }
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="date"
                  value={maintenanceData.date}
                  onChange={(e) =>
                    setMaintenanceData((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  required
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowMaintenanceModal(false)}
              >
                Chiudi
              </Button>
              <Button variant="primary" type="submit">
                Salva manutenzione
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </section>
  );
}
