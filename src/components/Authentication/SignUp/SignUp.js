import "./SignUp.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../../config.json";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const options = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = await axios
        .post(
          `${config.apiBase}/auth/register`,
          { email, password, name },
          options
        )
        .then((response) => {
          return response.data;
        });

      if (data) {
        toast.success(`Successfully registered as ${data.data.name}`, {
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
        navigate("/auth/verify");
      }
    } catch (error) {
      if (
        error.response.data.message ===
        "Request parameters are invalid or missing."
      ) {
        toast.warn("Name, Email and Password are required.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (error.response.data.message === "Email is invalid") {
        toast.error("Email is not allowed.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (error.response.data.message === "User exists") {
        toast.error("Email is already used.", {
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

  const handleMail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  return (
    <div className="signUp">
      <div className="signUpBox">
        <h2>Sign Up</h2>

        <h3 className="signUp-name">Name</h3>

        <input
          type=" text "
          className="signUpName"
          required
          placeholder="Name"
          onChange={handleName}
        />
        <h3 className="signUp-email">E-Mail</h3>

        <input
          type=" text "
          className="signUpEmail"
          required
          placeholder="Email"
          onChange={handleMail}
        />
        <h3 className="signUp-password ">Passworc</h3>

        <input
          type="password "
          className="signUpPassword"
          required
          placeholder="Password"
          onChange={handlePassword}
        />
        <button className="signUpButton" onClick={handleSubmit}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Sign Up
        </button>
        <Link to="/auth/login">Already registered?</Link>
      </div>
    </div>
  );
};

export default SignUp;
