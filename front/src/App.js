import React, { Fragment, useEffect } from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/private/private";
import Home from "./components/homepage/home";
import SignUp from "./components/auth/signup";
import SignIn from "./components/auth/signin";
import ButtonAppBar from "./components/utils/Navbar";

import { Provider } from "react-redux";
import store from "./components/Redux/Store";

import { loadUser } from "./components/Redux/Auth/auth.actions";
import setAuthToken from "./components/utils/Auth.Token";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <ButtonAppBar />
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </Fragment>
    </Provider>
  );
};

export default App;
