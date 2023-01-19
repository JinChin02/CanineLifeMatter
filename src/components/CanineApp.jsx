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
import userClickContext from "../context/userClickContext";

const CanineApp = () => {
  let selecteddog = useRef(null);
  let userSelectedLocation = useRef(null);

  return (
    <div className="CanineApp">
      <BrowserRouter>
        <Header />
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GM_KEY}>
          <dogContext.Provider value={selecteddog}>
            <userClickContext.Provider value = {userSelectedLocation}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/imageUpload" element={<ImageUpload />} />
                <Route path="/logoutMessage" element={<LogoutMessage />} />
                <Route path="/googleMap" element={<Map />} />
                <Route path="/adoption" element={<Adoption />} />
                <Route path="/donation" element={<Donation />} />
                <Route path="/manage" element={<Manage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/hospitalUpload" element={<HospitalUpload />} />
              </Routes>
            </userClickContext.Provider>
          </dogContext.Provider>
        </LoadScript>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
export default CanineApp;
