import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const LogoutMessage = (props) => {
  const navigate = useNavigate();

  const time = () => {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const noTime = () => {
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  if (sessionStorage.getItem("userlogin") !== null) {
    return <div>{noTime()}</div>;
  } else {
    return (
      <div>
        <div>
          <h2 className="fillSpaceL"> You have successfully logout </h2>
          {time()}
        </div>
      </div>
    );
  }
};

export default LogoutMessage;
