import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import store from "./store";

import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./common/PrivateRoute";

import Header from "./component/layout/Header";
import Landing from "./component/layout/Landing";
import Posts from "./component/Posts";
import Teachers from "./component/Teachers";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Dashboard from "./component/dashboard/Dashboard";
import CreateProfile from "./component/createProfile/CreateProfile";
import EditProfile from "./component/editProfile/EditProfile";
import AddSubject from "./component/addSubject/AddSubject";
import Profile from "./component/profile/Profile";

import { setCurrentUser, logoutUser } from "./actions/authAction";
import { clearCurrentProfile } from "./actions/profileAction";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = "/";
  }
}

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
              <Route exact path="/profile/:handle" component={Profile} />

              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-subject"
                  component={AddSubject}
                />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
