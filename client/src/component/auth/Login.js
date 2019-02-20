import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";

import { loginUser } from "../../actions/authAction";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/posts");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/posts");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
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

          <h5 className="indigo-text">Please, login into your account</h5>
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
                        invalid: errors.email
                      })}
                      type="email"
                      name="email"
                      id="email"
                      onChange={this.onChange}
                      value={this.state.email}
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
                      onChange={this.onChange}
                      value={this.state.password}
                    />
                    <label className="active" htmlFor="password">
                      Enter your password
                    </label>
                    {errors.password && (
                      <div className="red-text">{errors.password}</div>
                    )}
                  </div>
                  <label style={{ float: "right" }}>
                    <a className="indigo-accent-4-text" href="#!">
                      <b>Forgot Password?</b>
                    </a>
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
                      Login
                    </button>
                  </div>
                </center>
              </form>
            </div>
          </div>
          <Link to="/register">Create account</Link>
        </center>

        <div className="section" />
        <div className="section" />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
