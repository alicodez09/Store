import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="mt-5">
        <ul className="list-group">
          <h2 className="text-center">User Pannel</h2>

          <Link
            to="/dashboard/user-pannel"
            className="list-group-item  bg-dark text-white p-3"
            activeClassName="custom-active"
          >
            User
          </Link>
          <Link
            to="/dashboard/user/orders"
            className="list-group-item bg-dark text-white p-3"
          >
            Orders
          </Link>
          <Link
            to="/dashboard/user/profile"
            className="list-group-item bg-dark text-white p-3"
          >
            Profile
          </Link>

          <Link to="/" className="list-group-item bg-dark text-white p-3">
            Go Back
          </Link>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
