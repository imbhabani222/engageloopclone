import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import identity from "lodash/identity";

import appReducers from "./root-reducers";
import appRootSaga from "./sagas";
import { Auth, Hub } from "aws-amplify";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import envConfig from "./config/env-urls";
import constants from "./constants/constants";

const REACT_APP_ENV = process.env.REACT_APP_ENV;
const APIs = envConfig[REACT_APP_ENV].API;
const cookies = new Cookies();

const {
  ROUTES: {
    HOME
  }
} = constants;

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : identity
)(createStore);

const store = createStoreWithMiddleware(appReducers, {});

sagaMiddleware.run(appRootSaga);

const listener = (data) => {
  switch (data.payload.event) {
    // eslint-disable-next-line no-lone-blocks
    case "signIn": {
      Auth.currentAuthenticatedUser()
        .then(user => console.log(user))
        .catch(() => console.log("Not signed in"));
    }
      break;
    case "cognitoHostedUI":
      Auth.currentAuthenticatedUser()
        .then((user) => {
          const { signInUserSession } = user;
          const accessToken = signInUserSession.accessToken.jwtToken;
          axios
            .post(`${APIs.baseURL}auth/api/v1/validate-login`, {
              token: accessToken
            })
            .then((_data) => {
              const { data } = _data;
              const { roleName, dbInstance, name, firstName } =
                data.data.user;
              const { logo } = data.data;
              const decodedToken = jwtDecode(accessToken);
              let { exp } = decodedToken;
              exp -= (new Date().getTimezoneOffset() * 60);
              exp *= 1000;
              cookies.set("elToken", accessToken, {
                path: "/",
                expires: new Date(exp)
              });
              cookies.set("elUserRole", roleName, {
                path: "/",
                expires: new Date(exp)
              });
              cookies.set("elUserLogo", logo, {
                path: "/",
                expires: new Date(exp)
              });
              cookies.set("elUserName", name || firstName, {
                path: "/",
                expires: new Date(exp)
              });
              cookies.set("elUserOrgCode", dbInstance, {
                path: "/",
                expires: new Date(exp)
              });
              location.replace(HOME);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => console.log("Not signed in"));
      break;
    case "signUp":
      console.log("user signed up");
      break;
    case "signOut":
      console.log("user signed out");
      break;
    case "signIn_failure":
      console.log("user sign in failed");
      break;
    case "tokenRefresh":
      console.log("token refresh succeeded");
      break;
    case "tokenRefresh_failure":
      console.log("token refresh failed");
      break;
    case "configured":
      console.log("the Auth module is configured", Auth);
      break;
  }
};

Hub.listen("auth", listener);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
