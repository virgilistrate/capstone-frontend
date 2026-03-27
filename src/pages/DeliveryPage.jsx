import { Container, Row, Col, Button, Card } from "react-bootstrap";

import MainNavbar from "../components/MainNavbar";
import DeliverySection from "../components/DeliverySection";
import SiteFooter from "../components/SiteFooter";

export default function DeliveryPage() {
  return (
    <>
      <MainNavbar />
      <DeliverySection />
      <SiteFooter />
    </>
  );
}
