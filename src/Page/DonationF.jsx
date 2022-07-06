import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import DonationForm from "../components/DonationForm";

const stripePromise = loadStripe("pk_test_51LGoqIEuGrCFXQM1mDVCGqHspxgVK56LRlw5w1Ln9D9dut9XatpOibNjeE6tsi0efWdbBXowzLCHkVx1kEyw13D2008e1C9dDI");

export default function DonationF(){    
  return (
    <div className="DonationF">
    <Elements stripe={stripePromise}>
          <DonationForm />
    </Elements>
    </div>
  );


}