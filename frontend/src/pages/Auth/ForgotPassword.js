import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  // States
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secret_word, setSecret_word] = useState("");

  // useNavigate  funtion
  const navigate = useNavigate();

  // Form Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, secret_word, newPassword }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wents wrong");
    }
  };
  return (
    <>
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col">
              <div
                className="card p-5"
                style={{ maxWidth: "34rem", margin: "auto" }}
              >
                <h1 className="text-center  mb-3">Reset Password</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Enter Your Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={secret_word}
                      onChange={(e) => setSecret_word(e.target.value)}
                      className="form-control"
                      placeholder="Enter Your High School Name"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <input
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      placeholder="Enter Your New Password"
                      required
                    />
                  </div>

                  <div className=" text-center">
                    <button type="submit" className="btn btn-success  w-50">
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
