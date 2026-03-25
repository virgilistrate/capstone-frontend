import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Accordion,
  ListGroup,
} from "react-bootstrap";
import {
  BsTruck,
  BsGeoAlt,
  BsClockHistory,
  BsShieldCheck,
  BsCheckCircleFill,
  BsPhone,
  BsCalendarCheck,
  BsBoxSeam,
  BsArrowRight,
  BsStars,
  BsSpeedometer2,
  BsClipboardCheck,
  BsHouseDoor,
} from "react-icons/bs";

const deliveryHighlights = [
  {
    icon: <BsTruck size={42} />,
    title: "Consegna direttamente a casa",
    text: "Con DriveClick puoi ricevere la tua auto dove preferisci, senza complicazioni e con un processo semplice dall’ordine fino all’arrivo del veicolo.",
  },
  {
    icon: <BsCalendarCheck size={42} />,
    title: "Appuntamento concordato",
    text: "Ti contattiamo per organizzare data, fascia oraria e dettagli della consegna, così tutto avviene in modo chiaro e comodo per te.",
  },
  {
    icon: <BsShieldCheck size={42} />,
    title: "Servizio pensato per la tranquillità",
    text: "Ogni fase della consegna è studiata per offrirti un’esperienza affidabile, trasparente e in linea con l’acquisto auto online moderno.",
  },
];

const deliverySteps = [
  {
    icon: <BsClipboardCheck size={34} />,
    title: "Confermi l’acquisto",
    text: "Dopo aver scelto la tua auto online, il team DriveClick prepara tutti i dettagli necessari per avviare il servizio di consegna.",
  },
  {
    icon: <BsPhone size={34} />,
    title: "Ti contattiamo noi",
    text: "Un consulente ti aggiorna sulla pianificazione e concorda insieme a te il giorno della consegna e le informazioni pratiche.",
  },
  {
    icon: <BsTruck size={34} />,
    title: "Ricevi l’auto dove vuoi",
    text: "La tua vettura arriva nel luogo concordato, pronta per iniziare la tua esperienza con DriveClick in modo semplice e comodo.",
  },
];

const deliveryBenefits = [
  "Consegna a domicilio disponibile su richiesta",
  "Pianificazione semplice con supporto dedicato",
  "Aggiornamenti chiari sullo stato della consegna",
  "Esperienza digitale pensata per farti risparmiare tempo",
  "Servizio ideale per chi acquista auto online",
  "Maggiore comodità rispetto al ritiro tradizionale",
];

const DeliverySection = () => {
  return (
    <div style={{ backgroundColor: "#f7f8fc", color: "#172033" }}>
      <section
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #18284a 50%, #23408f 100%)",
          color: "#fff",
          padding: "90px 0 70px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "320px",
            height: "320px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "260px",
            height: "260px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "50%",
          }}
        />

        <Container style={{ position: "relative", zIndex: 2 }}>
          <Row className="align-items-center gy-5">
            <Col lg={6}>
              <Badge
                bg="light"
                text="dark"
                className="px-3 py-2 mb-3 rounded-pill fw-semibold"
              >
                Consegna DriveClick
              </Badge>

              <h1
                className="fw-bold"
                style={{
                  fontSize: "clamp(2.3rem, 5vw, 4.2rem)",
                  lineHeight: 1.1,
                  marginBottom: "20px",
                }}
              >
                La tua auto
                <br />
                arriva da te,
                <br />
                senza pensieri.
              </h1>

              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.86)",
                  maxWidth: "580px",
                }}
              >
                Con DriveClick puoi acquistare la tua auto online e, se ne hai
                bisogno, riceverla direttamente a domicilio. Un servizio
                moderno, semplice e pensato per offrirti più comodità, più tempo
                e un’esperienza d’acquisto davvero digitale.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <Button
                  size="lg"
                  style={{
                    background: "#ffffff",
                    color: "#102040",
                    border: "none",
                    padding: "14px 24px",
                    borderRadius: "14px",
                    fontWeight: 700,
                  }}
                >
                  Scopri come funziona <BsArrowRight className="ms-2" />
                </Button>

                <Button
                  size="lg"
                  variant="outline-light"
                  style={{
                    padding: "14px 24px",
                    borderRadius: "14px",
                    fontWeight: 700,
                  }}
                >
                  Contatta DriveClick
                </Button>
              </div>

              <div className="d-flex flex-wrap gap-4 mt-5">
                <div className="d-flex align-items-center gap-2">
                  <BsCheckCircleFill size={18} />
                  <span>Acquisto online</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <BsCheckCircleFill size={18} />
                  <span>Consegna disponibile</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <BsCheckCircleFill size={18} />
                  <span>Supporto dedicato</span>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div style={{ position: "relative" }}>
                <Card
                  className="border-0 shadow-lg"
                  style={{
                    borderRadius: "28px",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
                    alt="Consegna auto"
                    style={{
                      width: "100%",
                      height: "460px",
                      objectFit: "cover",
                    }}
                  />
                </Card>

                <Card
                  className="border-0 shadow"
                  style={{
                    position: "absolute",
                    left: "-10px",
                    bottom: "20px",
                    width: "220px",
                    borderRadius: "22px",
                    background: "#fff",
                  }}
                >
                  <Card.Body className="p-3">
                    <div
                      className="d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "58px",
                        height: "58px",
                        borderRadius: "18px",
                        background:
                          "linear-gradient(135deg, #2d5bff 0%, #6ea8fe 100%)",
                        color: "#fff",
                      }}
                    >
                      <BsTruck size={28} />
                    </div>
                    <h5 className="fw-bold mb-1">Comodità totale</h5>
                    <p
                      className="mb-0 text-muted"
                      style={{ fontSize: ".95rem" }}
                    >
                      Ricevi la tua auto nel luogo concordato con DriveClick.
                    </p>
                  </Card.Body>
                </Card>

                <Card
                  className="border-0 shadow"
                  style={{
                    position: "absolute",
                    right: "-10px",
                    top: "30px",
                    width: "220px",
                    borderRadius: "22px",
                    background: "#fff",
                  }}
                >
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: "54px",
                          height: "54px",
                          borderRadius: "16px",
                          background: "#eef4ff",
                          color: "#2d5bff",
                        }}
                      >
                        <BsGeoAlt size={26} />
                      </div>
                      <div>
                        <div className="fw-bold">Luogo concordato</div>
                        <div
                          className="text-muted"
                          style={{ fontSize: ".92rem" }}
                        >
                          Dove ti è più comodo
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section style={{ padding: "80px 0 30px" }}>
        <Container>
          <Row className="g-4">
            {deliveryHighlights.map((item, index) => (
              <Col md={4} key={index}>
                <Card
                  className="h-100 border-0 shadow-sm"
                  style={{ borderRadius: "24px" }}
                >
                  <Card.Body className="p-4 p-lg-5">
                    <div
                      className="d-inline-flex align-items-center justify-content-center mb-4"
                      style={{
                        width: "78px",
                        height: "78px",
                        borderRadius: "22px",
                        background:
                          "linear-gradient(135deg, #edf3ff 0%, #dbeafe 100%)",
                        color: "#1d4ed8",
                      }}
                    >
                      {item.icon}
                    </div>
                    <h4 className="fw-bold mb-3">{item.title}</h4>
                    <p className="text-muted mb-0" style={{ lineHeight: 1.8 }}>
                      {item.text}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section style={{ padding: "40px 0 80px" }}>
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={6}>
              <img
                src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
                alt="Auto in viaggio"
                className="img-fluid shadow"
                style={{
                  borderRadius: "28px",
                  width: "100%",
                  objectFit: "cover",
                  minHeight: "480px",
                }}
              />
            </Col>

            <Col lg={6}>
              <Badge
                bg="primary"
                className="px-3 py-2 mb-3 rounded-pill fw-semibold"
                style={{ backgroundColor: "#2d5bff" }}
              >
                Il servizio
              </Badge>

              <h2
                className="fw-bold mb-3"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Una consegna moderna,
                <br />
                semplice e flessibile.
              </h2>

              <p className="text-muted mb-4" style={{ lineHeight: 1.9 }}>
                La consegna DriveClick è pensata per chi desidera un’esperienza
                d’acquisto online davvero comoda. Dalla pianificazione al
                momento finale dell’arrivo dell’auto, ogni fase viene gestita
                con attenzione, chiarezza e supporto dedicato.
              </p>

              <ListGroup variant="flush" className="mb-4">
                {deliveryBenefits.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    className="px-0 py-3 border-0 bg-transparent"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <BsCheckCircleFill
                        size={20}
                        style={{ color: "#2d5bff", flexShrink: 0 }}
                      />
                      <span style={{ fontSize: "1.02rem" }}>{item}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <Card
                className="border-0"
                style={{
                  borderRadius: "24px",
                  background:
                    "linear-gradient(135deg, #f2f7ff 0%, #eef2ff 100%)",
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex gap-3">
                    <div
                      className="d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "62px",
                        height: "62px",
                        borderRadius: "18px",
                        background: "#fff",
                        color: "#2d5bff",
                        flexShrink: 0,
                      }}
                    >
                      <BsClockHistory size={30} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2">Organizzazione chiara</h5>
                      <p
                        className="text-muted mb-0"
                        style={{ lineHeight: 1.8 }}
                      >
                        Pianifichiamo ogni dettaglio con te, così la consegna
                        risulta più semplice, più lineare e perfettamente
                        integrata con la tua esperienza d’acquisto.
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section style={{ background: "#ffffff", padding: "85px 0" }}>
        <Container>
          <div className="text-center mb-5">
            <Badge
              bg="light"
              text="primary"
              className="px-3 py-2 rounded-pill fw-semibold mb-3"
            >
              Come funziona
            </Badge>
            <h2
              className="fw-bold"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Dall’acquisto alla consegna, tutto in pochi passaggi.
            </h2>
            <p
              className="text-muted mx-auto mt-3"
              style={{ maxWidth: "760px", lineHeight: 1.8 }}
            >
              DriveClick semplifica l’intero percorso: scegli la tua auto
              online, organizziamo i dettagli e ricevi il veicolo nel modo più
              comodo per te.
            </p>
          </div>

          <Row className="g-4">
            {deliverySteps.map((step, index) => (
              <Col md={4} key={index}>
                <Card
                  className="h-100 border-0 shadow-sm text-center"
                  style={{ borderRadius: "24px" }}
                >
                  <Card.Body className="p-4 p-lg-5">
                    <div
                      className="mx-auto d-flex align-items-center justify-content-center mb-4"
                      style={{
                        width: "84px",
                        height: "84px",
                        borderRadius: "24px",
                        background:
                          "linear-gradient(135deg, #1d4ed8 0%, #60a5fa 100%)",
                        color: "#fff",
                      }}
                    >
                      {step.icon}
                    </div>
                    <div
                      className="fw-bold mb-2"
                      style={{ color: "#2d5bff", letterSpacing: ".08em" }}
                    >
                      STEP {index + 1}
                    </div>
                    <h4 className="fw-bold mb-3">{step.title}</h4>
                    <p className="text-muted mb-0" style={{ lineHeight: 1.8 }}>
                      {step.text}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section style={{ padding: "85px 0", background: "#f7f8fc" }}>
        <Container>
          <Row className="g-4">
            <Col lg={4}>
              <Card
                className="h-100 border-0 shadow-sm"
                style={{
                  borderRadius: "28px",
                  background:
                    "linear-gradient(135deg, #112041 0%, #1f3d83 100%)",
                  color: "#fff",
                }}
              >
                <Card.Body className="p-4 p-lg-5">
                  <div
                    className="d-inline-flex align-items-center justify-content-center mb-4"
                    style={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "24px",
                      background: "rgba(255,255,255,0.12)",
                    }}
                  >
                    <BsStars size={38} />
                  </div>
                  <h3 className="fw-bold mb-3">
                    Perché scegliere la consegna DriveClick
                  </h3>
                  <p
                    style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.9 }}
                  >
                    Perché comprare online deve essere davvero comodo fino in
                    fondo. La consegna a domicilio completa l’esperienza e rende
                    il percorso più semplice, più moderno e più vicino alle
                    esigenze reali del cliente.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={8}>
              <Row className="g-4">
                <Col md={6}>
                  <Card
                    className="h-100 border-0 shadow-sm"
                    style={{ borderRadius: "24px" }}
                  >
                    <Card.Body className="p-4">
                      <BsHouseDoor size={42} style={{ color: "#2d5bff" }} />
                      <h5 className="fw-bold mt-3 mb-2">Più comodità</h5>
                      <p
                        className="text-muted mb-0"
                        style={{ lineHeight: 1.8 }}
                      >
                        Ricevere l’auto direttamente a domicilio significa meno
                        spostamenti e un’esperienza molto più pratica.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card
                    className="h-100 border-0 shadow-sm"
                    style={{ borderRadius: "24px" }}
                  >
                    <Card.Body className="p-4">
                      <BsSpeedometer2 size={42} style={{ color: "#2d5bff" }} />
                      <h5 className="fw-bold mt-3 mb-2">
                        Esperienza più veloce
                      </h5>
                      <p
                        className="text-muted mb-0"
                        style={{ lineHeight: 1.8 }}
                      >
                        Un processo digitale ben organizzato ti aiuta a
                        risparmiare tempo e a vivere l’acquisto con più
                        semplicità.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card
                    className="h-100 border-0 shadow-sm"
                    style={{ borderRadius: "24px" }}
                  >
                    <Card.Body className="p-4">
                      <BsBoxSeam size={42} style={{ color: "#2d5bff" }} />
                      <h5 className="fw-bold mt-3 mb-2">Servizio curato</h5>
                      <p
                        className="text-muted mb-0"
                        style={{ lineHeight: 1.8 }}
                      >
                        Ogni fase della consegna viene organizzata con
                        attenzione, per offrire maggiore chiarezza e
                        affidabilità.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card
                    className="h-100 border-0 shadow-sm"
                    style={{ borderRadius: "24px" }}
                  >
                    <Card.Body className="p-4">
                      <BsGeoAlt size={42} style={{ color: "#2d5bff" }} />
                      <h5 className="fw-bold mt-3 mb-2">
                        Maggiore flessibilità
                      </h5>
                      <p
                        className="text-muted mb-0"
                        style={{ lineHeight: 1.8 }}
                      >
                        Un servizio pensato per adattarsi meglio alle esigenze
                        di chi compra online e vuole ricevere l’auto con più
                        comfort.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section style={{ background: "#ffffff", padding: "85px 0" }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={9}>
              <div className="text-center mb-5">
                <Badge
                  bg="light"
                  text="primary"
                  className="px-3 py-2 rounded-pill fw-semibold mb-3"
                >
                  Domande frequenti
                </Badge>
                <h2
                  className="fw-bold"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  Tutto quello che vuoi sapere sulla consegna.
                </h2>
              </div>

              <Accordion flush>
                <Accordion.Item
                  eventKey="0"
                  className="mb-3 border-0 shadow-sm"
                  style={{ borderRadius: "18px", overflow: "hidden" }}
                >
                  <Accordion.Header>
                    Come funziona la consegna a domicilio?
                  </Accordion.Header>
                  <Accordion.Body>
                    Dopo l’acquisto, il team DriveClick ti contatta per
                    organizzare i dettagli della consegna e definire insieme il
                    momento più adatto per ricevere il veicolo.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item
                  eventKey="1"
                  className="mb-3 border-0 shadow-sm"
                  style={{ borderRadius: "18px", overflow: "hidden" }}
                >
                  <Accordion.Header>
                    Posso scegliere il luogo di consegna?
                  </Accordion.Header>
                  <Accordion.Body>
                    Sì, il servizio è pensato per offrire comodità e
                    flessibilità. Il luogo viene concordato con DriveClick in
                    base alle esigenze del cliente e alla fattibilità del
                    servizio.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item
                  eventKey="2"
                  className="mb-3 border-0 shadow-sm"
                  style={{ borderRadius: "18px", overflow: "hidden" }}
                >
                  <Accordion.Header>
                    Riceverò aggiornamenti sulla consegna?
                  </Accordion.Header>
                  <Accordion.Body>
                    Certamente. Durante il processo ricevi indicazioni chiare e
                    supporto dedicato, così puoi vivere ogni fase con maggiore
                    serenità.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item
                  eventKey="3"
                  className="border-0 shadow-sm"
                  style={{ borderRadius: "18px", overflow: "hidden" }}
                >
                  <Accordion.Header>
                    La consegna è coerente con l’esperienza online di
                    DriveClick?
                  </Accordion.Header>
                  <Accordion.Body>
                    Assolutamente sì. DriveClick nasce per offrire un’esperienza
                    d’acquisto auto online moderna e completa, e la consegna a
                    domicilio è uno degli elementi che la rende ancora più
                    comoda.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      <section
        style={{
          padding: "90px 0",
          background:
            "linear-gradient(135deg, #0f172a 0%, #18284a 50%, #23408f 100%)",
          color: "#fff",
        }}
      >
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2
                className="fw-bold mb-3"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                Acquista online, ricevila dove vuoi.
              </h2>
              <p
                className="mb-4"
                style={{
                  color: "rgba(255,255,255,0.82)",
                  fontSize: "1.08rem",
                  lineHeight: 1.9,
                }}
              >
                Con DriveClick la consegna diventa parte di un’esperienza
                moderna, comoda e costruita attorno al cliente. Più semplicità,
                più comfort, più valore in ogni fase del percorso.
              </p>

              <div className="d-flex justify-content-center flex-wrap gap-3">
                <Button
                  size="lg"
                  style={{
                    background: "#fff",
                    color: "#102040",
                    border: "none",
                    borderRadius: "14px",
                    padding: "14px 24px",
                    fontWeight: 700,
                  }}
                >
                  Scopri le auto disponibili
                </Button>

                <Button
                  size="lg"
                  variant="outline-light"
                  style={{
                    borderRadius: "14px",
                    padding: "14px 24px",
                    fontWeight: 700,
                  }}
                >
                  Richiedi maggiori informazioni
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default DeliverySection;
