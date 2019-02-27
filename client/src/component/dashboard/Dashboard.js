import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getCurrentProfile } from "../../actions/profileAction";
import Spinner from "../../common/Spinner";
import Subject from "./Subject";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, profileLoding } = this.props.profile;
    let dashboardContent;

    if (profile === null || profileLoding) {
      dashboardContent = (
        <h4>
          <Spinner />
        </h4>
      );
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <h3 className="header center black-text">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>{" "}
            </h3>
            <div className="row center">
              <h5 className="header left col s12 light indigo-text accent-4">
                You have not yet setup a profile,please add some info
              </h5>
            </div>
            <div className="center">
              <Link
                to="/edit-profile"
                className="waves-effect waves-teal btn-flat center indigo accent-4 white-text"
                style={{ marginRight: "10px" }}
              >
                Edit Profile
              </Link>

              <Link
                to="/add-subject"
                className="waves-effect waves-teal btn-flat center indigo accent-4 white-text"
              >
                Add Subject
              </Link>
            </div>
            {profile.subject.length > 0 && (
              <Subject subject={profile.subject} />
            )}
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <h3 className="header center black-text">Welcome {user.name}</h3>
            <div className="row center">
              <h5 className="header left col s12 light indigo-text accent-4">
                You have not yet setup a profile,please add some info
              </h5>
            </div>
            <Link
              to="/create-profile"
              className="waves-effect waves-teal btn-flat right indigo accent-4 white-text"
            >
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <br />
          {dashboardContent}
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
  { getCurrentProfile }
)(Dashboard);
