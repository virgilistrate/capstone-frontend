import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import MainNavbar from "../components/MainNavbar";

export default function AdminCreateVehiclePage() {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [sedi, setSedi] = useState([]);
  const [optionals, setOptionals] = useState([]);

  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [imageLinks, setImageLinks] = useState([""]);

  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    const fetchData = async () => {
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
        setModels(modelsData);
      } catch (error) {
        console.error(error);
        setErrorMessage("Errore nel caricamento dei dati iniziali.");
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchModelsByBrand = async () => {
      try {
        const url = formData.brandId
          ? `http://localhost:3003/models?brandId=${formData.brandId}`
          : "http://localhost:3003/models";

        const response = await fetch(url);
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchModelsByBrand();
  }, [formData.brandId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "brandId" ? { modelId: "" } : {}),
    }));
  };

  const handleOptionalChange = (optionalId, checked) => {
    setFormData((prev) => ({
      ...prev,
      optionalIds: checked
        ? [...prev.optionalIds, optionalId]
        : prev.optionalIds.filter((id) => id !== optionalId),
    }));
  };

  const handleImageLinkChange = (index, value) => {
    const updatedLinks = [...imageLinks];
    updatedLinks[index] = value;
    setImageLinks(updatedLinks);
  };

  const addImageField = () => {
    setImageLinks((prev) => [...prev, ""]);
  };

  const removeImageField = (index) => {
    setImageLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
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
    });

    setImageLinks([""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const cleanedImageUrls = imageLinks
        .map((link) => link.trim())
        .filter((link) => link !== "");

      const payload = {
        plateNumber: formData.plateNumber,
        price: Number(formData.price),
        yearOfConstruction: Number(formData.yearOfConstruction),
        kilometers: Number(formData.kilometers),
        color: formData.color,
        fuelType: formData.fuelType,
        seats: Number(formData.seats),
        doorsNumber: Number(formData.doorsNumber),
        engineCapacity: Number(formData.engineCapacity),
        enginePower: Number(formData.enginePower),
        engineConsumption: Number(formData.engineConsumption),
        tractiontype: formData.tractiontype,
        vehicleLength: Number(formData.vehicleLength),
        vehicleWidth: Number(formData.vehicleWidth),
        vehicleHeight: Number(formData.vehicleHeight),
        trunkSize: Number(formData.trunkSize),
        emissionsClass: formData.emissionsClass,
        co2Emissions: Number(formData.co2Emissions),
        brandId: Number(formData.brandId),
        modelId: Number(formData.modelId),
        bodyTypeId: Number(formData.bodyTypeId),
        sedeId: Number(formData.sedeId),
        optionalIds: formData.optionalIds,
        imageIds: [],
        imageUrls: cleanedImageUrls,
        maintenanceIds: [],
      };

      const response = await fetch("http://localhost:3003/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Errore nella creazione del veicolo");
      }

      await response.json();
      setSuccessMessage("Veicolo creato con successo.");
      resetForm();
    } catch (error) {
      console.error(error);
      setErrorMessage("Non sono riuscito a creare il veicolo.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) {
    return (
      <>
        <MainNavbar />
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="mt-3 mb-0">Caricamento dati...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <MainNavbar />

      <Container className="py-4 admin-create-vehicle-page">
        <Card className="shadow-sm border-0 rounded-4">
          <Card.Body className="p-4 p-md-5">
            <h2 className="mb-4 fw-bold">Crea nuovo veicolo</h2>

            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Targa</Form.Label>
                    <Form.Control
                      name="plateNumber"
                      value={formData.plateNumber}
                      onChange={handleChange}
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
                      value={formData.price}
                      onChange={handleChange}
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
                      value={formData.yearOfConstruction}
                      onChange={handleChange}
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
                      value={formData.kilometers}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Colore</Form.Label>
                    <Form.Control
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Alimentazione</Form.Label>
                    <Form.Control
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
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
                      value={formData.seats}
                      onChange={handleChange}
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
                      value={formData.doorsNumber}
                      onChange={handleChange}
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
                      value={formData.engineCapacity}
                      onChange={handleChange}
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
                      value={formData.enginePower}
                      onChange={handleChange}
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
                      value={formData.engineConsumption}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Trazione</Form.Label>
                    <Form.Select
                      name="tractiontype"
                      value={formData.tractiontype}
                      onChange={handleChange}
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
                      value={formData.vehicleLength}
                      onChange={handleChange}
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
                      value={formData.vehicleWidth}
                      onChange={handleChange}
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
                      value={formData.vehicleHeight}
                      onChange={handleChange}
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
                      value={formData.trunkSize}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Classe emissioni</Form.Label>
                    <Form.Control
                      name="emissionsClass"
                      value={formData.emissionsClass}
                      onChange={handleChange}
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
                      value={formData.co2Emissions}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Brand</Form.Label>
                    <Form.Select
                      name="brandId"
                      value={formData.brandId}
                      onChange={handleChange}
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
                      value={formData.modelId}
                      onChange={handleChange}
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
                      value={formData.bodyTypeId}
                      onChange={handleChange}
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
                      value={formData.sedeId}
                      onChange={handleChange}
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
                          id={`optional-${optional.id}`}
                          label={optional.name}
                          checked={formData.optionalIds.includes(optional.id)}
                          onChange={(e) =>
                            handleOptionalChange(optional.id, e.target.checked)
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
                      {imageLinks.map((link, index) => (
                        <div key={index} className="d-flex gap-2">
                          <Form.Control
                            type="text"
                            placeholder="Incolla URL immagine"
                            value={link}
                            onChange={(e) =>
                              handleImageLinkChange(index, e.target.value)
                            }
                          />

                          {imageLinks.length > 1 && (
                            <Button
                              variant="outline-danger"
                              type="button"
                              onClick={() => removeImageField(index)}
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
                      onClick={addImageField}
                    >
                      Aggiungi un altro link
                    </Button>
                  </Form.Group>
                </Col>

                <Col xs={12} className="d-flex justify-content-end gap-2 mt-4">
                  <Button
                    variant="outline-secondary"
                    type="button"
                    onClick={resetForm}
                  >
                    Reset
                  </Button>

                  <Button variant="primary" type="submit" disabled={saving}>
                    {saving ? "Salvataggio..." : "Salva veicolo"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
