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
  BsShieldCheck,
  BsTruck,
  BsPatchCheck,
  BsTools,
  BsCalendarCheck,
  BsTelephone,
  BsArrowRight,
  BsCheckCircleFill,
  BsStars,
  BsSpeedometer2,
  BsClipboard2Heart,
} from "react-icons/bs";

const features = [
  {
    icon: <BsShieldCheck size={42} />,
    title: "Garanzia fino a 24 mesi",
    text: "Ogni auto DriveClick include una copertura pensata per offrirti tranquillità fin dal primo giorno, con possibilità di estensione su molti modelli.",
  },
  {
    icon: <BsTools size={42} />,
    title: "Assistenza rapida e semplice",
    text: "In caso di imprevisti, ti guidiamo passo dopo passo nella gestione della pratica con un supporto chiaro e veloce.",
  },
  {
    icon: <BsTruck size={42} />,
    title: "Consegna a domicilio disponibile",
    text: "Acquista online in totale comodità: se ne hai bisogno, DriveClick può consegnare la tua auto direttamente dove vuoi.",
  },
];

const coverItems = [
  "Motore e componenti principali",
  "Cambio manuale e automatico",
  "Impianto di raffreddamento",
  "Sistema di alimentazione",
  "Trasmissione e differenziale",
  "Componenti elettronici essenziali",
];

const steps = [
  {
    icon: <BsCalendarCheck size={34} />,
    title: "Scegli la tua auto",
    text: "Acquisti online in modo semplice, con schede chiare, foto dettagliate e tutte le informazioni utili.",
  },
  {
    icon: <BsPatchCheck size={34} />,
    title: "Ricevi la tua copertura",
    text: "La garanzia DriveClick entra in gioco dal momento della consegna o del ritiro del veicolo.",
  },
  {
    icon: <BsTelephone size={34} />,
    title: "Ti aiutiamo in caso di necessità",
    text: "Se hai bisogno di assistenza, il nostro team ti supporta rapidamente per trovare la soluzione più adatta.",
  },
];

const WarrantySection = () => {
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
            filter: "blur(4px)",
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
                Garanzia DriveClick
              </Badge>

              <h1
                className="fw-bold"
                style={{
                  fontSize: "clamp(2.3rem, 5vw, 4.2rem)",
                  lineHeight: 1.1,
                  marginBottom: "20px",
                }}
              >
                Più tranquillità,
                <br />
                più fiducia,
                <br />
                più strada da fare.
              </h1>

              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.86)",
                  maxWidth: "580px",
                }}
              >
                Con DriveClick acquisti la tua auto online in modo semplice e
                sicuro. La nostra garanzia è pensata per proteggere il tuo
                acquisto e farti vivere ogni chilometro con maggiore serenità,
                con supporto dedicato e consegna disponibile quando serve.
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
                  Scopri la copertura <BsArrowRight className="ms-2" />
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
                  <span>Acquisto 100% online</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <BsCheckCircleFill size={18} />
                  <span>Supporto dedicato</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <BsCheckCircleFill size={18} />
                  <span>Consegna disponibile</span>
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
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                    alt="Auto in showroom"
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
                      <BsShieldCheck size={28} />
                    </div>
                    <h5 className="fw-bold mb-1">Protezione inclusa</h5>
                    <p
                      className="mb-0 text-muted"
                      style={{ fontSize: ".95rem" }}
                    >
                      Una copertura progettata per acquistare online con più
                      sicurezza.
                    </p>
                  </Card.Body>
                </Card>

                <Card
                  className="border-0 shadow"
                  style={{
                    position: "absolute",
                    right: "-10px",
                    top: "30px",
                    width: "210px",
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
                        <BsTruck size={26} />
                      </div>
                      <div>
                        <div className="fw-bold">Consegna disponibile</div>
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
            {features.map((item, index) => (
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
                src="https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?auto=format&fit=crop&w=1200&q=80"
                alt="Dettaglio volante auto"
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
                Cosa comprende
              </Badge>

              <h2
                className="fw-bold mb-3"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Una garanzia pensata
                <br />
                per darti serenità.
              </h2>

              <p className="text-muted mb-4" style={{ lineHeight: 1.9 }}>
                La copertura DriveClick nasce per proteggere le parti più
                importanti del veicolo e offrirti un supporto concreto dopo
                l’acquisto. Una soluzione semplice, chiara e adatta a chi compra
                auto online con aspettative alte su servizio e affidabilità.
              </p>

              <ListGroup variant="flush" className="mb-4">
                {coverItems.map((item, index) => (
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
                      <BsClipboard2Heart size={30} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-2">
                        Gestione semplice della richiesta
                      </h5>
                      <p
                        className="text-muted mb-0"
                        style={{ lineHeight: 1.8 }}
                      >
                        In caso di necessità, il team DriveClick ti accompagna
                        nella procedura con istruzioni chiare e assistenza
                        dedicata.
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
              Tutto facile, tutto online.
            </h2>
            <p
              className="text-muted mx-auto mt-3"
              style={{ maxWidth: "760px", lineHeight: 1.8 }}
            >
              Dalla scelta dell’auto alla consegna, DriveClick semplifica ogni
              fase. Anche la garanzia segue la stessa filosofia: meno stress,
              più chiarezza.
            </p>
          </div>

          <Row className="g-4">
            {steps.map((step, index) => (
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
                  <h3 className="fw-bold mb-3">Perché scegliere DriveClick</h3>
                  <p
                    style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.9 }}
                  >
                    Un’esperienza moderna, digitale e costruita attorno alla
                    fiducia. Acquisti online, ricevi supporto umano e puoi
                    contare su una garanzia pensata per accompagnarti davvero
                    dopo la vendita.
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
                      <BsSpeedometer2 size={42} style={{ color: "#2d5bff" }} />
                      <h5 className="fw-bold mt-3 mb-2">Processi veloci</h5>
                      <p
                        className="text-muted mb-0"
                        style={{ lineHeight: 1.8 }}
                      >
                        Risposte rapide, supporto semplice e una customer
                        experience snella, dal click iniziale alla consegna.
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
                      <BsPatchCheck size={42} style={{ color: "#2d5bff" }} />
                      <h5 className="fw-bold mt-3 mb-2">
                        Qualità e affidabilità
                      </h5>
                      <p
                        className="text-muted mb-0"
                        style={{ lineHeight: 1.8 }}
                      >
                        Veicoli selezionati e un servizio orientato alla
                        tranquillità del cliente anche dopo l’acquisto.
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
                      <BsTruck size={42} style={{ color: "#2d5bff" }} />
                      <h5 className="fw-bold mt-3 mb-2">
                        Auto online, anche consegnata
                      </h5>
                      <p
                        className="text-muted mb-0"
                        style={{ lineHeight: 1.8 }}
                      >
                        Scegli la tua auto da casa e, quando ne hai bisogno,
                        DriveClick si occupa anche della consegna.
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
                      <BsShieldCheck size={42} style={{ color: "#2d5bff" }} />
                      <h5 className="fw-bold mt-3 mb-2">
                        Copertura trasparente
                      </h5>
                      <p
                        className="text-muted mb-0"
                        style={{ lineHeight: 1.8 }}
                      >
                        Una garanzia chiara, moderna e costruita per rendere
                        l’esperienza d’acquisto più sicura e rassicurante.
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
                  Tutto quello che vuoi sapere.
                </h2>
              </div>

              <Accordion flush>
                <Accordion.Item
                  eventKey="0"
                  className="mb-3 border-0 shadow-sm"
                  style={{ borderRadius: "18px", overflow: "hidden" }}
                >
                  <Accordion.Header>
                    Quanto dura la garanzia DriveClick?
                  </Accordion.Header>
                  <Accordion.Body>
                    La durata può variare in base al veicolo e alla formula
                    scelta, con soluzioni che possono includere coperture
                    standard e opzioni di estensione per una maggiore
                    tranquillità.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item
                  eventKey="1"
                  className="mb-3 border-0 shadow-sm"
                  style={{ borderRadius: "18px", overflow: "hidden" }}
                >
                  <Accordion.Header>
                    Cosa devo fare se ho bisogno di assistenza?
                  </Accordion.Header>
                  <Accordion.Body>
                    Ti basta contattare il team DriveClick: riceverai supporto
                    dedicato e tutte le indicazioni necessarie per gestire la
                    richiesta in modo semplice e veloce.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item
                  eventKey="2"
                  className="mb-3 border-0 shadow-sm"
                  style={{ borderRadius: "18px", overflow: "hidden" }}
                >
                  <Accordion.Header>
                    Posso acquistare l’auto online e riceverla a casa?
                  </Accordion.Header>
                  <Accordion.Body>
                    Sì, DriveClick nasce proprio per rendere l’acquisto di auto
                    online comodo, moderno e affidabile, con possibilità di
                    consegna in base alle esigenze del cliente.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item
                  eventKey="3"
                  className="border-0 shadow-sm"
                  style={{ borderRadius: "18px", overflow: "hidden" }}
                >
                  <Accordion.Header>
                    La garanzia è pensata anche per chi compra online?
                  </Accordion.Header>
                  <Accordion.Body>
                    Assolutamente sì. La filosofia DriveClick è offrire
                    un’esperienza digitale con un alto livello di fiducia,
                    supportando il cliente anche dopo la consegna del veicolo.
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
                La tua prossima auto, con una protezione in più.
              </h2>
              <p
                className="mb-4"
                style={{
                  color: "rgba(255,255,255,0.82)",
                  fontSize: "1.08rem",
                  lineHeight: 1.9,
                }}
              >
                DriveClick unisce acquisto online, servizio moderno e consegna
                disponibile a una garanzia pensata per offrire più serenità e
                più fiducia in ogni fase del percorso.
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
                  Parla con un consulente
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default WarrantySection;
