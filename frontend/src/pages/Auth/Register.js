import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [secret_word, setSecret_word] = useState("");
  // UseNavigate function
  const navigate = useNavigate();
  // Form Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, secret_word }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
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
      <div className="register ">
        <div className="container">
          <div className="row">
            <div className="col">
              <div
                className="card p-5"
                style={{ maxWidth: "34rem", margin: "auto" }}
              >
                <h1 className="text-center  mb-2">Register</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Username"
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Enter Your Email"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      placeholder="Enter Your Password"
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <input
                      value={secret_word}
                      onChange={(e) => setSecret_word(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="What is your Secret Word?"
                      required
                    />
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-success w-50">
                      Register
                    </button>
                  </div>
                </form>
                <div className="mt-2">
                  <p>
                    Already have an account?
                    <span>
                      <Link to="/login" style={{ textDecoration: "none" }}>
                        Login Now
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

export default Register;
