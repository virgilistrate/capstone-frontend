import { Container, Row, Col, Button, Card } from "react-bootstrap";
import ImageSection from "../components/ImageSection";
import SearchSections from "../components/SearchSections";
import MainNavbar from "../components/MainNavbar";
import HomepageAesthetics from "../components/HomepageAesthetics";
import SiteFooter from "../components/SiteFooter";

export default function Home() {
  return (
    <>
      <MainNavbar />
      <ImageSection />
      <SearchSections />
      <HomepageAesthetics />
      <SiteFooter />
    </>
  );
}
