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

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [sedi, setSedi] = useState([]);
  const [optionals, setOptionals] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editSaving, setEditSaving] = useState(false);

  const [editFormData, setEditFormData] = useState({
    id: null,
    plateNumber: "",
    price: "",
    yearOfConstruction: "",
    kilometers: "",
    color: "",
    fuelType: "",
    seats: "",
    doorsNumber: "",
    engineCapacity: "",
    enginePower: "",
    engineConsumption: "",
    tractiontype: "",
    vehicleLength: "",
    vehicleWidth: "",
    vehicleHeight: "",
    trunkSize: "",
    emissionsClass: "",
    co2Emissions: "",
    brandId: "",
    modelId: "",
    bodyTypeId: "",
    sedeId: "",
    optionalIds: [],
    imageUrls: [""],
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

  const fetchAdminSupportData = async () => {
    try {
      const [brandsRes, bodyTypesRes, sediRes, optionalsRes, modelsRes] =
        await Promise.all([
          fetch("http://localhost:3003/brands"),
          fetch("http://localhost:3003/body-types"),
          fetch("http://localhost:3003/sedi"),
          fetch("http://localhost:3003/optionals"),
          fetch("http://localhost:3003/models"),
        ]);

      const [brandsData, bodyTypesData, sediData, optionalsData, modelsData] =
        await Promise.all([
          brandsRes.json(),
          bodyTypesRes.json(),
          sediRes.json(),
          optionalsRes.json(),
          modelsRes.json(),
        ]);

      setBrands(brandsData);
      setBodyTypes(bodyTypesData);
      setSedi(sediData);
      setOptionals(optionalsData);
      setAllModels(modelsData);
      setModels(modelsData);
    } catch (error) {
      console.error(error);
      setErrorMessage("Errore nel caricamento dei dati admin.");
    }
  };

  useEffect(() => {
    fetchVehicles();
    fetchAdminSupportData();
  }, []);

  useEffect(() => {
    const fetchModelsByBrand = async () => {
      try {
        if (!editFormData.brandId) {
          setModels(allModels);
          return;
        }

        const response = await fetch(
          `http://localhost:3003/models?brandId=${editFormData.brandId}`,
        );
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (showEditModal) {
      fetchModelsByBrand();
    }
  }, [editFormData.brandId, allModels, showEditModal]);

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleDelete = async (vehicleId) => {
    const confirmDelete = window.confirm(
      "Vuoi davvero eliminare questo veicolo?",
    );
    if (!confirmDelete) return;

    clearMessages();

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
    clearMessages();

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

  const openEditModal = (vehicle) => {
    setEditFormData({
      id: vehicle.id,
      plateNumber: vehicle.plateNumber || "",
      price: vehicle.price ?? "",
      yearOfConstruction: vehicle.yearOfConstruction ?? "",
      kilometers: vehicle.kilometers ?? "",
      color: vehicle.color || "",
      fuelType: vehicle.fuelType || "",
      seats: vehicle.seats ?? "",
      doorsNumber: vehicle.doorsNumber ?? "",
      engineCapacity: vehicle.engineCapacity ?? "",
      enginePower: vehicle.enginePower ?? "",
      engineConsumption: vehicle.engineConsumption ?? "",
      tractiontype: vehicle.tractiontype || "",
      vehicleLength: vehicle.vehicleLength ?? "",
      vehicleWidth: vehicle.vehicleWidth ?? "",
      vehicleHeight: vehicle.vehicleHeight ?? "",
      trunkSize: vehicle.trunkSize ?? "",
      emissionsClass: vehicle.emissionsClass || "",
      co2Emissions: vehicle.co2Emissions ?? "",
      brandId: vehicle.brand?.id?.toString() || "",
      modelId: vehicle.model?.id?.toString() || "",
      bodyTypeId: vehicle.bodyType?.id?.toString() || "",
      sedeId: vehicle.sede?.id?.toString() || "",
      optionalIds: vehicle.optionals?.map((optional) => optional.id) || [],
      imageUrls:
        vehicle.images && vehicle.images.length > 0
          ? vehicle.images.map((img) => img.imageUrl || "")
          : [""],
    });

    clearMessages();
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "brandId" ? { modelId: "" } : {}),
    }));
  };

  const handleEditOptionalChange = (optionalId, checked) => {
    setEditFormData((prev) => ({
      ...prev,
      optionalIds: checked
        ? [...prev.optionalIds, optionalId]
        : prev.optionalIds.filter((id) => id !== optionalId),
    }));
  };

  const handleEditImageChange = (index, value) => {
    setEditFormData((prev) => {
      const updatedImageUrls = [...prev.imageUrls];
      updatedImageUrls[index] = value;

      return {
        ...prev,
        imageUrls: updatedImageUrls,
      };
    });
  };

  const addEditImageField = () => {
    setEditFormData((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ""],
    }));
  };

  const removeEditImageField = (index) => {
    setEditFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    setEditSaving(true);

    try {
      const cleanedImageUrls = editFormData.imageUrls
        .map((url) => url.trim())
        .filter((url) => url !== "");

      const payload = {
        plateNumber: editFormData.plateNumber,
        price: editFormData.price === "" ? null : Number(editFormData.price),
        yearOfConstruction:
          editFormData.yearOfConstruction === ""
            ? null
            : Number(editFormData.yearOfConstruction),
        kilometers:
          editFormData.kilometers === ""
            ? null
            : Number(editFormData.kilometers),
        color: editFormData.color,
        fuelType: editFormData.fuelType,
        seats: editFormData.seats === "" ? null : Number(editFormData.seats),
        doorsNumber:
          editFormData.doorsNumber === ""
            ? null
            : Number(editFormData.doorsNumber),
        engineCapacity:
          editFormData.engineCapacity === ""
            ? null
            : Number(editFormData.engineCapacity),
        enginePower:
          editFormData.enginePower === ""
            ? null
            : Number(editFormData.enginePower),
        engineConsumption:
          editFormData.engineConsumption === ""
            ? null
            : Number(editFormData.engineConsumption),
        tractiontype: editFormData.tractiontype,
        vehicleLength:
          editFormData.vehicleLength === ""
            ? null
            : Number(editFormData.vehicleLength),
        vehicleWidth:
          editFormData.vehicleWidth === ""
            ? null
            : Number(editFormData.vehicleWidth),
        vehicleHeight:
          editFormData.vehicleHeight === ""
            ? null
            : Number(editFormData.vehicleHeight),
        trunkSize:
          editFormData.trunkSize === "" ? null : Number(editFormData.trunkSize),
        emissionsClass: editFormData.emissionsClass,
        co2Emissions:
          editFormData.co2Emissions === ""
            ? null
            : Number(editFormData.co2Emissions),
        brandId:
          editFormData.brandId === "" ? null : Number(editFormData.brandId),
        modelId:
          editFormData.modelId === "" ? null : Number(editFormData.modelId),
        bodyTypeId:
          editFormData.bodyTypeId === ""
            ? null
            : Number(editFormData.bodyTypeId),
        sedeId: editFormData.sedeId === "" ? null : Number(editFormData.sedeId),
        optionalIds: editFormData.optionalIds,
        imageUrls: cleanedImageUrls,
      };

      const response = await fetch(
        `http://localhost:3003/vehicles/${editFormData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error("Errore nella modifica del veicolo");
      }

      await response.json();

      setSuccessMessage("Veicolo modificato con successo.");
      setShowEditModal(false);
      fetchVehicles();
    } catch (error) {
      console.error(error);
      setErrorMessage("Non sono riuscito a modificare il veicolo.");
    } finally {
      setEditSaving(false);
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
                Modifica dati, disponibilità, immagini, optional ed elimina
                veicoli.
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
                            variant="outline-dark"
                            onClick={() => openEditModal(vehicle)}
                          >
                            Modifica veicolo
                          </Button>

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

        <Modal show={showEditModal} onHide={closeEditModal} size="xl" centered>
          <Modal.Header closeButton>
            <Modal.Title>Modifica veicolo</Modal.Title>
          </Modal.Header>

          <Form onSubmit={handleEditSubmit}>
            <Modal.Body>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Targa</Form.Label>
                    <Form.Control
                      name="plateNumber"
                      value={editFormData.plateNumber}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Prezzo</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Anno</Form.Label>
                    <Form.Control
                      type="number"
                      name="yearOfConstruction"
                      value={editFormData.yearOfConstruction}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Chilometri</Form.Label>
                    <Form.Control
                      type="number"
                      name="kilometers"
                      value={editFormData.kilometers}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Colore</Form.Label>
                    <Form.Control
                      name="color"
                      value={editFormData.color}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Alimentazione</Form.Label>
                    <Form.Control
                      name="fuelType"
                      value={editFormData.fuelType}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Posti</Form.Label>
                    <Form.Control
                      type="number"
                      name="seats"
                      value={editFormData.seats}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Porte</Form.Label>
                    <Form.Control
                      type="number"
                      name="doorsNumber"
                      value={editFormData.doorsNumber}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Cilindrata</Form.Label>
                    <Form.Control
                      type="number"
                      name="engineCapacity"
                      value={editFormData.engineCapacity}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Potenza</Form.Label>
                    <Form.Control
                      type="number"
                      name="enginePower"
                      value={editFormData.enginePower}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Consumo motore</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.1"
                      name="engineConsumption"
                      value={editFormData.engineConsumption}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Trazione</Form.Label>
                    <Form.Select
                      name="tractiontype"
                      value={editFormData.tractiontype}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Seleziona</option>
                      <option value="FWD">FWD</option>
                      <option value="RWD">RWD</option>
                      <option value="AWD">AWD</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Lunghezza</Form.Label>
                    <Form.Control
                      type="number"
                      name="vehicleLength"
                      value={editFormData.vehicleLength}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Larghezza</Form.Label>
                    <Form.Control
                      type="number"
                      name="vehicleWidth"
                      value={editFormData.vehicleWidth}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Altezza</Form.Label>
                    <Form.Control
                      type="number"
                      name="vehicleHeight"
                      value={editFormData.vehicleHeight}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Bagagliaio</Form.Label>
                    <Form.Control
                      type="number"
                      name="trunkSize"
                      value={editFormData.trunkSize}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Classe emissioni</Form.Label>
                    <Form.Control
                      name="emissionsClass"
                      value={editFormData.emissionsClass}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Emissioni CO2</Form.Label>
                    <Form.Control
                      type="number"
                      name="co2Emissions"
                      value={editFormData.co2Emissions}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Brand</Form.Label>
                    <Form.Select
                      name="brandId"
                      value={editFormData.brandId}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Seleziona brand</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Model</Form.Label>
                    <Form.Select
                      name="modelId"
                      value={editFormData.modelId}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Seleziona modello</option>
                      {models.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Body Type</Form.Label>
                    <Form.Select
                      name="bodyTypeId"
                      value={editFormData.bodyTypeId}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Seleziona body type</option>
                      {bodyTypes.map((bodyType) => (
                        <option key={bodyType.id} value={bodyType.id}>
                          {bodyType.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Sede</Form.Label>
                    <Form.Select
                      name="sedeId"
                      value={editFormData.sedeId}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Seleziona sede</option>
                      {sedi.map((sede) => (
                        <option key={sede.id} value={sede.id}>
                          {sede.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Optionals</Form.Label>
                    <div className="admin-checkbox-list">
                      {optionals.map((optional) => (
                        <Form.Check
                          key={optional.id}
                          type="checkbox"
                          id={`edit-optional-${optional.id}`}
                          label={optional.name}
                          checked={editFormData.optionalIds.includes(
                            optional.id,
                          )}
                          onChange={(e) =>
                            handleEditOptionalChange(
                              optional.id,
                              e.target.checked,
                            )
                          }
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Link immagini</Form.Label>

                    <div className="d-flex flex-column gap-2">
                      {editFormData.imageUrls.map((link, index) => (
                        <div key={index} className="d-flex gap-2">
                          <Form.Control
                            type="text"
                            placeholder="Incolla URL immagine"
                            value={link}
                            onChange={(e) =>
                              handleEditImageChange(index, e.target.value)
                            }
                          />

                          {editFormData.imageUrls.length > 1 && (
                            <Button
                              variant="outline-danger"
                              type="button"
                              onClick={() => removeEditImageField(index)}
                            >
                              X
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline-primary"
                      type="button"
                      className="mt-3"
                      onClick={addEditImageField}
                    >
                      Aggiungi un altro link
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={closeEditModal}>
                Annulla
              </Button>
              <Button variant="primary" type="submit" disabled={editSaving}>
                {editSaving ? "Salvataggio..." : "Salva modifiche"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </section>
  );
}
