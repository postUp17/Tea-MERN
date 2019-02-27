import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { addSubject } from "../../actions/profileAction";

import TextFieldGroup from "../../common/TextFieldGroup";

class AddSubject extends Component {
  state = {
    subjectname: "",
    coordinator: "",
    tutor: "",
    description: "",
    errors: {}
  };

  componentWillReceiveProps(nextPorps) {
    if (nextPorps.errors) {
      this.setState({ errors: nextPorps.errors });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const subejectData = {
      subjectname: this.state.subjectname,
      coordinator: this.state.coordinator,
      tutor: this.state.tutor,
      description: this.state.description
    };
    this.props.addSubject(subejectData, this.props.history);
  };
  render() {
    const { errors } = this.state;

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
          Add Subject
        </h2>
        <p>* is Required Field</p>

        <div className="row">
          <form onSubmit={this.onSubmit} className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <TextFieldGroup
                  id="subjectname"
                  type="text"
                  name="subjectname"
                  value={this.state.subjectname}
                  onChange={this.onChange}
                  htmlFor="subjectname"
                  error={errors.subjectname}
                />
              </div>

              <div className="input-field col s6">
                <TextFieldGroup
                  id="coordinator"
                  type="text"
                  name="coordinator"
                  value={this.state.coordinator}
                  onChange={this.onChange}
                  htmlFor="coordinator"
                  error={errors.coordinator}
                />
              </div>

              <div className="input-field col s6">
                <TextFieldGroup
                  id="tutor"
                  type="text"
                  name="tutor"
                  value={this.state.tutor}
                  onChange={this.onChange}
                  htmlFor="tutor"
                  error={errors.tutor}
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <TextFieldGroup
                  id="description"
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  htmlFor="description"
                  error={errors.description}
                />
              </div>
            </div>

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
  { addSubject }
)(withRouter(AddSubject));
