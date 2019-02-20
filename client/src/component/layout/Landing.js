import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="section no-pad-bot" id="index-banner">
          <div className="container">
            <br />
            <h1 className="header center black-text">Starter Template</h1>
            <div className="row center">
              <h5 className="header col s12 light indigo-text accent-4">
                A modern responsive front-end framework based on Material Design
              </h5>
            </div>
            <div className="row center">
              <Link
                to="/register"
                id="download-button"
                className="btn-large waves-effect waves-light indigo accent-4 "
                style={{ margin: "32px 48px 0px 48px" }}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                id="download-button"
                className="btn-large waves-effect waves-light indigo accent-4 "
                style={{ margin: "32px 48px 0px 0" }}
              >
                Login
              </Link>
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
