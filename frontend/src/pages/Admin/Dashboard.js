import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
        <button
          type="button"
          className="btn btn-secondary"
          style={{ position: "absolute", top: 0, left: 0, margin: ".3rem" }}
        >
          <NavLink to="/" className="nav-link ">
            Go Back
          </NavLink>
        </button>
      </div>
    </>
  );
};

export default Dashboard;
