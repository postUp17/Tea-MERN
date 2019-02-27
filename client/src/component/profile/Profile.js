import React, { Component } from "react";
import { connect } from "react-redux";

import { getProfileByHandle } from "../../actions/profileAction";
import isEmpty from "../../validation/is-empty";
import Spinner from "../common/Spinner";
class profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="card ">
          <div className="card-content indigo-text">
            <span className="card-title black-text">{user.name}</span>
            <p>{profile.bio}</p>
          </div>
          <div className="card-action">
            {isEmpty(profile.social && profile.social.facebook) ? null : (
              <a href={"http://" + profile.social.facebook}>
                Facebook
                <i className="material-icons" />
              </a>
            )}
            {isEmpty(profile.social && profile.social.facebook) ? null : (
              <a href={"http://" + profile.social.linkedin}>
                Linkedin
                <i className="material-icons" />
              </a>
            )}
          </div>
        </div>
      );
    }
    return (
      <div
        className="container"
        style={{
          marginTop: "40px",
          marginRight: "auto",
          marginLeft: "auto",
          width: "1000px"
        }}
      >
        <div className="row valign-wrapper">
          <div className="col s6 offset-s3 valign">{profileContent}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(profile);
