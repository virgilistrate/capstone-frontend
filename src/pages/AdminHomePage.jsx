import MainNavbar from "../components/MainNavbar";
import AdminHeroSection from "../components/AdminHeroSection";
import AdminQuickActions from "../components/AdminQuickActions";
import AdminCreateVehicleSection from "../components/AdminCreateVehicleSection";
import AdminManageVehiclesSection from "../components/AdminManageVehiclesSection";
import "../App.css";

export default function AdminHomePage() {
  return (
    <>
      <MainNavbar />
      <AdminHeroSection />
      <AdminQuickActions />
      <AdminCreateVehicleSection />
      <AdminManageVehiclesSection />
    </>
  );
}
