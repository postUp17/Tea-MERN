import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";

import { registerUser } from "../../actions/authAction";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <main>
        <center>
          <img
            alt=""
            className="responsive-img"
            style={{ width: "250px" }}
            src="https://i.imgur.com/ax0NCsK.gif"
          />
          <div className="section" />

          <h5 className="indigo-text">Please Create Your Account</h5>
          <div className="section" />

          <div className="container">
            <div
              className="z-depth-1 grey lighten-4 row"
              style={{
                display: "inline-block",
                padding: "32px 48px 0px 48px",
                border: "1px solid #EEE"
              }}
            >
              <form className="col s12" onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col s12" />
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      className={classnames("validate", {
                        invalid: errors.name
                      })}
                      type="text"
                      name="name"
                      id="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    <label className="active" htmlFor="name">
                      Enter your name
                    </label>
                    {errors.name && (
                      <div className="red-text">{errors.name}</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      className={classnames("validate", {
                        invalid: errors.email
                      })}
                      type="email"
                      name="email"
                      id="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    <label className="active" htmlFor="email">
                      Enter your email
                    </label>
                    {errors.email && (
                      <div className="red-text">{errors.email}</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      className={classnames("validate", {
                        invalid: errors.password
                      })}
                      type="password"
                      name="password"
                      id="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    <label className="active" htmlFor="password">
                      Enter your password
                    </label>
                    {errors.password && (
                      <div className="red-text">{errors.password}</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      className={classnames("validate", {
                        invalid: errors.password2
                      })}
                      type="password"
                      name="password2"
                      id="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                    />
                    <label className="active" htmlFor="password2">
                      Confirm your password
                    </label>
                    {errors.password2 && (
                      <div className="red-text">{errors.password2}</div>
                    )}
                  </div>
                  <label style={{ float: "right" }}>
                    <Link className="indigo-accent-4-text" to="/login">
                      Already have an account?
                    </Link>
                  </label>
                </div>

                <br />
                <center>
                  <div className="row">
                    <button
                      type="submit"
                      name="btn_login"
                      className="col s12 btn btn-large waves-effect indigo"
                    >
                      Sumbmit
                    </button>
                  </div>
                </center>
              </form>
            </div>
          </div>
        </center>

        <div className="section" />
        <div className="section" />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
