import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createProfile } from "../../actions/profileAction";

import TextFieldGroup from "../../common/TextFieldGroup";

class CreateProfile extends Component {
  state = {
    displayScocialInputs: false,
    handle: "",
    major: "",
    fieldofstudy: "",
    skills: "",
    bio: "",
    facebook: "",
    linkedin: "",
    errors: {}
  };

  componentWillReceiveProps(nextPorps) {
    if (nextPorps.errors) {
      this.setState({ errors: nextPorps.errors });
    }
  }

  onSocialInputsToggle = () => {
    this.setState(prevState => ({
      displayScocialInputs: !prevState.displayScocialInputs
    }));
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      major: this.state.major,
      fieldofstudy: this.state.fieldofstudy,
      skills: this.state.skills,
      bio: this.state.bio,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin
    };
    this.props.createProfile(profileData, this.props.history);
  };
  render() {
    const { errors } = this.state;

    let socialInputs;
    if (this.state.displayScocialInputs) {
      socialInputs = (
        <div>
          <div className="row">
            <div className="input-field col s12">
              <TextFieldGroup
                id="facebook"
                type="text"
                name="facebook"
                value={this.state.facebook}
                onChange={this.onChange}
                htmlFor="facebook"
                error={errors.facebook}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <TextFieldGroup
                id="linkedin"
                type="text"
                name="linkedin"
                value={this.state.linkedin}
                onChange={this.onChange}
                htmlFor="linkedin"
                error={errors.linkedin}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <Link
          to="/dashboard"
          className="Grey btn-flat darken-3"
          style={{ margin: "20px 0 0 0" }}
        >
          Back
          <i className="material-icons left">arrow_back</i>
        </Link>
        <h2 style={{ marginTop: "0" }} className="header center black-text">
          Create Profile
        </h2>
        <p>* is Required Field</p>

        <div className="row">
          <form onSubmit={this.onSubmit} className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <TextFieldGroup
                  id="handle"
                  type="text"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  htmlFor="handle"
                  error={errors.handle}
                />
              </div>

              <div className="input-field col s6">
                <TextFieldGroup
                  id="major"
                  type="text"
                  name="major"
                  value={this.state.major}
                  onChange={this.onChange}
                  htmlFor="major"
                  error={errors.major}
                />
              </div>

              <div className="input-field col s6">
                <TextFieldGroup
                  id="fieldofstudy"
                  type="text"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  htmlFor="fieldofstudy"
                  error={errors.fieldofstudy}
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <TextFieldGroup
                  id="skills"
                  type="text"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  htmlFor="skills"
                  error={errors.skills}
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <TextFieldGroup
                  id="bio"
                  type="text"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  htmlFor="bio"
                  error={errors.bio}
                />
              </div>
            </div>

            <div className="row">
              <button
                className=" left white indigo-text"
                onClick={this.onSocialInputsToggle}
                type="button"
              >
                Social Networks
              </button>
            </div>
            {socialInputs}

            <button
              type="submit"
              name="btn_login"
              className="col s12 btn btn-large waves-effect indigo accent-4"
            >
              submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
