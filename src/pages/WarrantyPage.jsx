import { Container, Row, Col, Button, Card } from "react-bootstrap";

import MainNavbar from "../components/MainNavbar";
import WarrantySection from "../components/WarrantySection";
import SiteFooter from "../components/SiteFooter";

export default function WarrantyPage() {
  return (
    <>
      <MainNavbar />
      <WarrantySection />
      <SiteFooter />
    </>
  );
}
