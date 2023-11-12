import "./Verify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../../config.json";
import { useState } from "react";
import { toast } from "react-toastify";

const Verify = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const options = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const data = await axios
        .post(
          `${config.apiBase}/auth/verify`,
          { otp: parseInt(password) },
          options
        )
        .then((response) => {
          return response.data;
        });
      console.log(data);
      if (data)
        toast.success(`Successfully verified ${data.data.name}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

      localStorage.setItem("userInfo", JSON.stringify(data.data));
      navigate("/chat");
    } catch (error) {
      console.log(error.response.data);
      if (
        error.response.data.message ===
        "Request parameters are invalid or missing."
      ) {
        toast.warn(`Password is required.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (
        (error.response.data.message =
          "You are not authorized to access the request")
      ) {
        toast.error(`Invalid Password`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div className="verify">
      <div className="verifyBox">
        <h2>Verify</h2>
        <p className="verifyInfo">
          We have sent an email to {userInfo.email}. Please type in the code
          below.
        </p>
        <h3 className="verify-password ">Password</h3>

        <input
          type="number"
          className="verifyPassword"
          required
          placeholder="Password"
          onChange={handlePassword}
        />
        <button className="verifyButton" onClick={handleSubmit}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Verify
        </button>
        <Link to="/auth/signup">No Account yet?</Link>
      </div>
    </div>
  );
};

export default Verify;
