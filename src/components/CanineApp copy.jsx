import React, { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WithNavigation from "../Utilities/WithNavigation";
import Footer from "./Footer";
import Login from "../Page/Login";
import Registration from "../Page/Registration";
import HomePage from "../Page/HomePage";
import ImageUpload from "../Page/ImageUpload";
import LogoutMessage from "../Page/LogoutMessage";
import Map from "../Page/MapPage";
import Adoption from "../Page/Adoption";
import Manage from "../Page/Manage";
import { LoadScript } from "@react-google-maps/api";
import Donation from "../Page/DonationF";
import Dashboard from "../Page/Dashboard";
import Header from "./Header";
import HospitalUpload from "../Page/HospitalUpload";
import dogContext from "../context/dogContext";

const CanineApp = () => {
  const LoginWithNav = WithNavigation(Login);
  const ImageUploadWithNav = WithNavigation(ImageUpload);
  const RegistrationWithNav = WithNavigation(Registration);
  const LogoutWithNav = WithNavigation(LogoutMessage);
  const HeaderWithNav = WithNavigation(Header);

  let selecteddog = useRef(null);

  return (
    <div className="CanineApp">
      <BrowserRouter>
        <HeaderWithNav />
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GM_KEY}>
          <dogContext.Provider value={selecteddog}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginWithNav />} />
              <Route path="/register" element={<RegistrationWithNav />} />
              <Route path="/imageUpload" element={<ImageUploadWithNav />} />
              <Route path="/logoutMessage" element={<LogoutWithNav />} />
              <Route path="/googleMap" element={<Map />} />
              <Route path="/adoption" element={<Adoption />} />
              <Route path="/donation" element={<Donation />} />
              <Route path="/manage" element={<Manage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/hospitalUpload" element={<HospitalUpload />} />
            </Routes>
          </dogContext.Provider>
        </LoadScript>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
export default CanineApp;
