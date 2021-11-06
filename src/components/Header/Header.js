import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";

const Header = ({ handle }) => {
  const [user, setUser] = useContext(UserContext);

  return (
    <div className="header">
      <h2>City Transport Corporation</h2>
      <div className="nav-list">
        <Link to="home">Home</Link>
        <Link to="destination">Destination</Link>
        <Link to="blog">Blog</Link>
        <Link to="contact">Contact</Link>
        {user.isSignIn ? (
          <button onClick={() => setUser({})}>Log out</button>
        ) : (
          <Link to="login">Login</Link>
        )}
       
      </div>
    </div>
  );
};

export default Header;
