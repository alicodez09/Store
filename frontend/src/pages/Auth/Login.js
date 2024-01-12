import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";

const Login = () => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Context
  const [auth, setAuth] = useAuth();
  // useNavigate nd useLocation funtion
  const navigate = useNavigate();
  const location = useLocation();
  // Form Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        // using context
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        // Storing data in local storage
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
                <h1 className="text-center  mb-3">Login</h1>
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
                  <div className="mb-5">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      placeholder="Enter Your Password"
                      required
                    />
                  </div>

                  <div
                    className=" d-flex align-items-center"
                    style={{ justifyContent: "space-between" }}
                  >
                    <button type="submit" className="btn btn-success  w-25">
                      Login
                    </button>
                    <button
                      type="submit"
                      className="btn btn-danger "
                      onClick={() => {
                        navigate("/forgot-password");
                      }}
                    >
                      Forgot Password
                    </button>
                  </div>
                </form>
                <div className="mt-2">
                  <p>
                    Don't have an account?{" "}
                    <span>
                      <Link to="/register" style={{ textDecoration: "none" }}>
                        Register Now
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
