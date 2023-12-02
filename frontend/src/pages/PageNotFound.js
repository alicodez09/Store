import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="container-fluid bg-danger d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 text-light">404</h1>
        <p className="lead text-light">Oops! Page not found</p>
        <p className="lead text-light">
          The requested page could not be found.
        </p>
        <NavLink to="/" className="btn btn-dark btn-sm">
          Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default PageNotFound;
