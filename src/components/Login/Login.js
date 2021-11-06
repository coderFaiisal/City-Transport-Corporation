import React, { useContext } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  handleGithubSignIn,
  handleGoogleSignIn,
  initializeFirebaseAuth,
  signinWithEmailAndPassword,
} from "./LoginManager";

initializeFirebaseAuth();

const Login = () => {
  const [user, setUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setUser(res);
      history.replace(from);
    });
  };

  const githubSignIn = () => {
    handleGithubSignIn().then((res) => {
      setUser(res);
      history.replace(from);
    });
  };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPassValid = e.target.value.length > 6;
      const isPassHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPassValid && isPassHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      signinWithEmailAndPassword(user.email, user.password).then((res) => {
        setUser(res);
        history.replace(from);
      });
    }
  };

  return (
    <div className="login">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onBlur={handleBlur}
            type="text"
            name="email"
            placeholder="Email "
            required
          />
          <br />
          <input
            onBlur={handleBlur}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <br />
          <input type="submit" value="Login" />
        </form>
        <p>
          Don't have an account? <Link to="/register">Create an account</Link>
        </p>
      </div>
      <div>
        <button onClick={githubSignIn}>Continue with Github</button>
        <br />
        <button onClick={googleSignIn}>Continue with Google</button>
      </div>
    </div>
  );
};

export default Login;
