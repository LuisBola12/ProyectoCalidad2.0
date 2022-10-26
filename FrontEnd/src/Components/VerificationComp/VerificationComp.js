import { React, useState, useEffect } from "react";
import { putVerificationUser } from "../../Utils/CreateUser/putVerificationUser";
import "../../App.css";
import "./VerificationComp.scss";
import { IconContext } from "react-icons";
import { BsCheck2Circle } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const VerificationComp = () => {
  const [infoReceived, setInfoReceived] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const getEmail = () => {
    const userUrl = window.location.href;
    const start = userUrl.indexOf("=");
    const end = userUrl.length;
    let userEmail = userUrl.slice(start + 1, end);
    return userEmail;
  };

  const verificateUser = async () => {
    const data = await putVerificationUser(getEmail());
    if (data.status === 200) {
      setInfoReceived(true);
      setVerified(true);
    } else {
      setVerified(false);
    }
  };

  useEffect(() => {
    verificateUser();
  }, []);

  return !infoReceived ? (
    <div className="loader"></div>
  ) : (
    <>
      <div className="verification-page">
        <div className="register-bar">
          <div className="register-logo"></div>
          <div className="register-title"> Sele Miracle Run </div>
        </div>        
        {verified ? (
          <>
            <h2 className="verify-text">
              Your SeleMiracleRun accunt has been verified.
            </h2>
            <IconContext.Provider
              value={{
                color: "green",
                className: "icon",
                size: "10rem",
              }}
            >
              <BsCheck2Circle />
            </IconContext.Provider>
            <div>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="create-button verify-btn-login"
              >
                {" "}
                Login{" "}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="verify-text">
              An error occurr during the verification process.
            </h2>
            <IconContext.Provider
              value={{
                color: "darkred",
                className: "icon",
                size: "10rem",
              }}
            >
              <BiErrorCircle />
            </IconContext.Provider>
            <div>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="create-button verify-btn-login"
              >
                {" "}
                Login{" "}
              </button>
              <button
                onClick={() => {
                  verificateUser();
                }}
                className="create-button verify-btn-resend"
              >
                {" "}
                Resend Email{" "}
              </button>
            </div>
          </>
        )}

        <footer className="register-footerCopyRights">
          {" "}
          &copy; SeleMiracleRun{" "}
        </footer>
      </div>
    </>
  );
};