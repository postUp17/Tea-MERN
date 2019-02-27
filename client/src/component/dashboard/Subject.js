import React, { Component } from "react";
import { connect } from "react-redux";

import { deleteSubject } from "../../actions/profileAction";

class Subject extends Component {
  onDeleteClick = id => {
    this.props.deleteSubject(id);
  };
  render() {
    const subjectContent = this.props.subject.map(sub => (
      <tr key={sub._id}>
        <td>{sub.subjectname}</td>
        <td>{sub.coordinator}</td>
        <td>{sub.tutor}</td>
        <td>
          <button
            style={{ marginLeft: "50px" }}
            className="btn waves-effect waves-light red"
            name="action"
            onClick={() => this.onDeleteClick(sub._id)}
          >
            Delete
            <i className="material-icons right">delete</i>
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <table
          style={{ width: "700px", marginTop: "70px" }}
          className="highlight"
        >
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Coordinator</th>
              <th>Tutor</th>
            </tr>
          </thead>

          <tbody>{subjectContent}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteSubject }
)(Subject);
