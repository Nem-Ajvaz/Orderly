import React from "react";
import { Link } from "react-router-dom";
import style from "../../assets/css/header.css";
import orderlyimg from "../../assets/images/orderly2.gif";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div className="navBar">
        <div className="navBarContainer">
          <div>
            <img src={orderlyimg} style={{ height: "150px" }}></img>
          </div>
          <div>
            <div className="heading">
              <Link className="headTitle" to="/">
                <h1 className="h1head">Orderly</h1>
              </Link>
              <p className="typewriter">Get your priorities in order.</p>
            </div>
          </div>
        </div>
        <div className="containDiv">
          {Auth.loggedIn() ? (
            <div className="credDiv">
              <button className="navbtn" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="credDiv">
              <button className="navbtn">
                <Link to="/login">Login</Link>
              </button>
              <button className="navbtn">
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
