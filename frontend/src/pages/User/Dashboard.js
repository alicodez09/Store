import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/authContext";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <div className="container-fluid vh-100  bg-light">
        <div className="row">
          <div className="col-4">
            <UserMenu />
          </div>
          <div className="col-8 mt-5 pt-2">
            <h2 className="text-center">Content</h2>
            <div className="card w-75 p-5 m-auto bg-dark">
              <h6 className="text-white"> Hello {auth?.user?.name}!</h6>
              <p className="text-white">
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
