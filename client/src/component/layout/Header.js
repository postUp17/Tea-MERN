import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import M from "materialize-css";

import { logoutUser } from "../../actions/authAction";

class Header extends Component {
  componentDidMount() {
    let elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, {
      inDuration: 300,
      outDuration: 225,
      coverTrigger: false
    });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const guestLinks = (
      <div>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/register">Sign Up</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    );

    const authLinks = (
      <ul id="nav-mobile" className="right hide-on-med-and-down ">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/" onClick={this.onLogoutClick}>
            <img
              className="circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "30px", margin: "15px 10px 0 0px" }}
            />
            Logout
          </Link>
        </li>
      </ul>
    );
    return (
      <nav>
        <div className="nav-wrapper indigo accent-4">
          <Link to="/" className="left brand-logo">
            Logo
          </Link>
          <ul id="dropdown1" className="dropdown-content indigo accent-4">
            <li>
              <Link className="white-text" to="/Posts">
                Posts
              </Link>
            </li>
            <li>
              <Link className="white-text" to="/Teachers">
                Teachers
              </Link>
            </li>
            <li className="divider" />
            <li>
              <a className="white-text" href="#!">
                More...
              </a>
            </li>
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a
                className="dropdown-trigger"
                href="#!"
                data-target="dropdown1"
                data-activates="dropdown1"
              >
                Drop Me
                <i className="material-icons right">arrow_drop_down</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Header));
