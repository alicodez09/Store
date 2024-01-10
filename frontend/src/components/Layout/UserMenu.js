import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="mt-5 ">
        <ul className="list-group">
          <h3 className="text-center">User Pannel</h3>
          <NavLink to="/dashboard/user/profile" className="list-group-item">
            Profile
          </NavLink>
          <NavLink to="/dashboard/user/orders" className="list-group-item">
            Orders
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
