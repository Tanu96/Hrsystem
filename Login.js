import React, { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { useUserAuth } from "../src/context/UserAuthContext";
import Logo from "../src/images/logo.jpg";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const { getErrorMessage } = useUserAuth()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("Login Successfully");
    try {
      await logIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  
  useEffect(() => {
    const errorMessage = getErrorMessage();
    errorMessage && setError(errorMessage);
  });

  return (
<div className="loginpage">
    <div className="loginbg">
      
    <div className="loginform">

      <Form className="emaillogin" onSubmit={handleSubmit} style={{ alignContent: 'center', justifyContent: 'center' }}>
      
      <div className="adminlogo">
        <img  className="pageimg" src={Logo} alt="logo" />
        <div className="header"> 
      <label className="loginname">Employee Login</label>
        </div>
      </div>

      {error && <Alert className="alert" variant="danger">{error}</Alert>}

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
            <input type="password" className="password"  placeholder="Enter your password" placeholdercolor="grey" 
              onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        <div className="text-right p-t-8 p-b-31">
          <span>Forgot password?</span>
        </div>

        <div className="p-4 box mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>

        <div className="loginbtn">
          <button type="Submit" className="SubmitLogin">
            LOGIN
          </button>
        </div>

      </Form>

    </div>

</div>
</div>
  );
};

export default Login;


