import React from 'react'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import UserMenu from '../../components/Layout/UserMenu';
const Orders = () => {
  return (
  <>
    <Link to="/">
        <AiOutlineArrowLeft style={{ fontSize: "2rem" }} />
      </Link>
      <div className="container-fluid mt-5">
        <div className="row m-3 p-3">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Orders</h1>
          </div>
        </div>
      </div>
  </>
  )
}

export default Orders