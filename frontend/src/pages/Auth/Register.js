import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",

    secret_word: "",
  });
  const navigate = useNavigate();
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
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,

      secret_word: data.secret_word,
    };
    try {
      const res = await axios.post(`/api/v1/auth/register`, payload);
      if (res.data.success) {
        alert("user registered successfully");
        navigate("/login");
      }
      console.log(res.data, "new user");
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
        <h3 className="mb-5 text-dark">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              name="name"
              value={data.name}
              type="text"
              className="form-control w-100"
              placeholder="Enter Your Name"
              onChange={handleChange}
              required
            />
          </div>
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
              name="password"
              value={data.password}
              type="password"
              className="form-control"
              placeholder="Enter Your Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              name="secret_word"
              type="text"
              value={data.secret_word}
              className="form-control"
              placeholder="Enter Your Secret Word"
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

export default Register;
