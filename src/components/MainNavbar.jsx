import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../App.css";

function MainNavbar() {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const syncAuthState = () => {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      setToken(savedToken);
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener("storage", syncAuthState);
    window.addEventListener("auth-changed", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("auth-changed", syncAuthState);
    };
  }, []);

  const isLoggedIn = !!token;
  const userDisplayName = user?.name || "Profilo";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("auth-changed"));
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="main-navbar py-2" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="main-navbar-brand">
          <div className="d-flex align-items-center gap-2">
            <div className="brand-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 14L5 8.5C5.3 7.6 6.1 7 7.1 7H16.9C17.9 7 18.7 7.6 19 8.5L21 14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 14H19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="7.5" cy="17.5" r="1.5" fill="currentColor" />
                <circle cx="16.5" cy="17.5" r="1.5" fill="currentColor" />
              </svg>
            </div>

            <span className="brand-text">
              Drive<span className="brand-text-accent">Click</span>
            </span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="mx-auto align-items-lg-center gap-lg-1">
            <Nav.Link as={NavLink} to="/" className="main-nav-link">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/cars" className="main-nav-link">
              Tutte le auto
            </Nav.Link>

            <Nav.Link as={NavLink} to="/warranty" className="main-nav-link">
              Garanzia
            </Nav.Link>

            <Nav.Link as={NavLink} to="/delivery" className="main-nav-link">
              Consegna
            </Nav.Link>

            <NavDropdown
              title="Esplora"
              id="main-navbar-dropdown"
              className="main-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/cars?bodyTypeId=1">
                SUV
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cars?bodyTypeId=2">
                Station Wagon
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cars?bodyTypeId=3">
                Berlina
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/cars?fuelType=Ibrida">
                Ibride
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cars?fuelType=Elettrica">
                Elettriche
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {!isLoggedIn ? (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-primary"
                  className="main-navbar-btn-outline small-auth-btn"
                >
                  Accedi
                </Button>

                <Button
                  as={Link}
                  to="/register"
                  className="main-navbar-btn-primary small-auth-btn"
                >
                  Registrati
                </Button>
              </>
            ) : (
              <NavDropdown
                align="end"
                id="profile-dropdown"
                className="profile-dropdown"
                title={
                  <span className="profile-trigger">
                    <span className="profile-avatar">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M4 21C4.8 17.9 7.7 16 12 16C16.3 16 19.2 17.9 20 21"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <span className="profile-name d-none d-lg-inline">
                      {userDisplayName}
                    </span>
                  </span>
                }
              >
                <NavDropdown.Header>Ciao {userDisplayName}</NavDropdown.Header>

                <NavDropdown.Item as={Link} to="/profilo">
                  Il mio profilo
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/preferiti">
                  Preferiti
                </NavDropdown.Item>

                {user?.role === "ADMIN" && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/admin">
                      Area admin
                    </NavDropdown.Item>
                  </>
                )}

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
