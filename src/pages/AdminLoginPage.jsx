import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loginResponse = await axios.post(
        "http://localhost:3003/auth/login",
        formData,
      );
      const token = loginResponse.data.token;

      const profileResponse = await axios.get(
        "http://localhost:3003/profile/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const user = profileResponse.data;

      if (user.role !== "ADMIN") {
        setError("Non sei autorizzato ad accedere all'area admin");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      window.dispatchEvent(new Event("auth-changed"));

      navigate("/admin");
    } catch (err) {
      setError(err.response?.data || "Accesso admin non consentito");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Login Admin</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="w-100">
                  Accedi come admin
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Link to="/login">Torna al login utente</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
