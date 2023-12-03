import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
const ResetPassword = () => {
  const [auth, setAuth] = useAuth();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    secret_word: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data, "data");

    try {
      const payload = {
        email: data.email,
        secret_word: data.secret_word,
        newPassword: data.newPassword,
      };
      const res = await axios.post(`/api/v1/auth/reset-password`, payload);
      if (res.data.success) {
        alert("password reset successfully");
        // using of context to save data of user
        setAuth({
          ...auth,
          user: res.data.data,
          token: res.data.token,
        });
        // store data in local storage
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      }
      console.log(res.data, "user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark ">
      <button
        type="button"
        className="btn btn-secondary"
        style={{ position: "absolute", top: 0, left: 0, margin: "1rem" }}
      >
        <NavLink to="/" className="nav-link text-light">
          Go Back
        </NavLink>
      </button>
      <div className="card text-white bg-light" style={{ padding: "2rem" }}>
        <h3 className="mb-5 text-dark">Reset Password </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              name="email"
              value={data.email}
              type="email"
              className="form-control"
              placeholder="Enter Your Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="secret_word"
              value={data.secret_word}
              type="text"
              className="form-control"
              placeholder="Enter Your Secret Word"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="newPassword"
              value={data.newPassword}
              type="password"
              className="form-control"
              placeholder="Enter Your New Password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark mt-3 w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
