import React from "react";
import { NavLink,Link } from "react-router-dom";
const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h1>User Panel</h1>
          <Link
            to="/dashboard/user"
            className="list-group-item list-group-item-action"
          >
           User 
          </Link>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
           User Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            User Orders
          </NavLink>
        
        </div>
      </div>
    </>
  );
};

export default UserMenu;
