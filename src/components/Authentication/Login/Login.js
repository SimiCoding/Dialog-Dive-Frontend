import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";

import axios from "axios";
import config from "../../../config.json";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const options = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = await axios
        .post(`${config.apiBase}/auth/login`, { email, password }, options)
        .then((response) => {
          return response.data;
        });

      if (data)
        toast.success(`Successfully logged in as ${data.data.name}`, {
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
      setLoading(false);
      if (!data.data.isVerified) {
        navigate("/auth/verify");
      } else navigate("/chat");
    } catch (error) {
      if (
        error.response.data.message ===
        "Request parameters are invalid or missing."
      ) {
        toast.warn("Email and Password are required.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (error.response.data.message === "User not found") {
        toast.error("User with email does not exist.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (error.response.data.message === "Invalid Email or Password") {
        toast.error("Invalid Email or Password.", {
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
      setLoading(false);
    }
  };

  const handleMail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <div className="loginBox">
        <h2>Login</h2>

        <h3 className="login-email">E-Mail</h3>

        <input
          type=" text "
          className="loginEmail"
          required
          placeholder="Email"
          onChange={handleMail}
        />
        <h3 className="login-password ">Password</h3>

        <input
          type="password "
          className="loginPassword"
          required
          placeholder="Password"
          onChange={handlePassword}
        />
        <button className="loginButton" onClick={handleSubmit}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </button>
        <Link to="/auth/signup">No Account yet?</Link>
      </div>
    </div>
  );
};

export default Login;
