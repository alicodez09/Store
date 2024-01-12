import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
const Dashboard = () => {
  const [auth] = useAuth();
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
          <div className="col-md-9 text-center">
            <h1 className="text-center">User Details</h1>
            <div className="card p-3 ">
            <h4 className=" fw-light text-capitalize " style={{textAlign:"start"}}>
           Name:  <span className="text-uppercase text-danger fw-bolder">{auth?.user?.name}</span>
            </h4>
            <h4 className=" fw-light " style={{textAlign:"start"}}>Email: <span className="text-danger fw-bolder">{auth?.user?.email}</span></h4>
            <h4 className=" fw-light " style={{textAlign:"start"}}>Address: <span className="text-danger fw-bolder">{auth?.user?.address}</span></h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
