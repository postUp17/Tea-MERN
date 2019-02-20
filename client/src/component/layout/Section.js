import React, { Component } from "react";

class Section extends Component {
  render() {
    return (
      <div class="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text">
                  <i className="material-icons">flash_on</i>
                </h2>
                <h5 className="center">Speeds up development</h5>

                <p className="light" />
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text">
                  <i className="material-icons">group</i>
                </h2>
                <h5 className="center">User Experience Focused</h5>

                <p className="light" />
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block ">
                <h2 className="center light-blue-text">
                  <i className="material-icons">settings</i>
                </h2>
                <h5 className="center">Easy to work with</h5>

                <p className="light" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Section;
