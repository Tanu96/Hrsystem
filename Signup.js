import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "./context/UserAuthContext";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="signupsection">
        {error && <Alert variant="danger">{error}</Alert>}

        <Form className="emaillogin" onSubmit={handleSubmit} style={{ alignContent: 'center', justifyContent: 'center' }}>
        <h2 className="signup">Signup</h2>

          <div className="wrap-input validate-input m-b-23" data-validate="Email is required">
            <span className="label-input100">Email</span>
            <div className="form-input">
              <span className="Loginicons">
                <MdIcons.MdOutlineEmail />
              </span>
              <input type="email" className="email" placeholder="Enter your email" autoComplete="none"
                onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="wrap-input validate-input m-b-23" data-validate="Password is required">
            <span className="label-input100">Password</span>
            <div className="form-input">
              <span className="Loginicons">
                <RiIcons.RiLockPasswordLine />
              </span>
              <input type="password" className="password" placeholder="Enter your password" placeholdercolor="grey"
                onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          {/* <div className="text-right p-t-8 p-b-31">
            <span>Forgot password?</span>
          </div> */}

          <div className="p-4 box mt-3 text-center">
            Login to your account? <Link to="/login">Login</Link>
          </div>

          <div className="loginbtn">
            <button type="Submit" className="SubmitLogin">
              Sign In
            </button>
          </div>

        </Form>
       
      </div>

    </>
  );
};

export default Signup;