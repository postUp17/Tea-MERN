import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import Header from "./component/layout/Header";
import Landing from "./component/layout/Landing";
import Posts from "./component/Posts";
import Teachers from "./component/Teachers";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="container">
            <div>
              <Header />
              <Route exact path="/" component={Landing} />
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/teachers" component={Teachers} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
