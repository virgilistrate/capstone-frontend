import { Container, Row, Col, Button, Card } from "react-bootstrap";

import MainNavbar from "../components/MainNavbar";
import VehicleCards from "../components/VehicleCards";
import ProductSearchBar from "../components/ProductSearchBar";
import "../App.css";
export default function AllCarsPage() {
  return (
    <>
      <MainNavbar />
      <ProductSearchBar />
      <VehicleCards />
    </>
  );
}
