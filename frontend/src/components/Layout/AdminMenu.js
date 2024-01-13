import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="mt-5">
        <ul className="list-group">
          <h2 className="text-center">Admin Pannel</h2>

          <Link
            to="/dashboard/admin-pannel"
            className="list-group-item  bg-dark text-white p-3"
            activeClassName="custom-active"
          >
            Admin
          </Link>
          <Link
            to="/dashboard/admin/create-category"
            className="list-group-item bg-dark text-white p-3"
          >
            Create Category
          </Link>
          <Link
            to="/dashboard/admin/create-product"
            className="list-group-item bg-dark text-white p-3"
          >
            Create Product
          </Link>
          <Link
            to="/dashboard/admin/users"
            className="list-group-item bg-dark text-white p-3"
          >
            Users
          </Link>
          <Link to="/" className="list-group-item bg-dark text-white p-3">
            Go Back
          </Link>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
