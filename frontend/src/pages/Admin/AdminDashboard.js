import React from "react";

import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/authContext";
const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div className="container-fluid vh-100  bg-light">
        <div className="row">
          <div className="col-4">
            <AdminMenu />
          </div>
          <div className="col-8 mt-5">
            <h3 className="text-center">Content</h3>
            <div className="card w-75 p-5 m-auto">
              <h6> Hello {auth?.user?.name}!</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis, suscipit ratione nulla quo ullam autem pariatur
                saepe eveniet, molestias expedita quaerat perferendis itaque
                quos a voluptatem eaque repudiandae dignissimos obcaecati!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
