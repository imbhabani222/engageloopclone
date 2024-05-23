import React, { Suspense, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  withRouter,
  Switch,
  Redirect,
  Route,
  useLocation,
  useHistory
} from "react-router-dom";
import Cookies from "universal-cookie";

import RouteLoader from "./components/RouteLoader/RouteLoader";

import constants from "./constants/constants";
import { checkForValidToken, getRemainingTimeForToken } from "./utils";

import { initilizeOrg } from "./actions/orgActions";

import MainLayout from "./views/MainLayout/MainLayout";
import Amplify from "@aws-amplify/core";

const Home = React.lazy(() => import("./views/Home/Home"));
const Onboard = React.lazy(() => import("./views/Onboard/onboard"));
const Auth = React.lazy(() => import("./views/Auth/Auth"));
const EmpOnboard = React.lazy(() =>
  import("./views/EmployeeOnboard/onboardEmployee"));
const Pages = React.lazy(() => import("./views/pages/mainPageLayout"));

const {
  ROUTES: {
    HOME,
    LOGIN,
    CONTACT_US,
    ONBOARD,
    VIEWONBOARD,
    FORGOT_PASSWORD,
    ACTIVATEACCOUNT,
    RESETPASSWORD,
    CHANGEPASSWORD,
    EDITORG,
    ONBOARDEMPLOYEE,
    VIEWALLEMPLOYEE,
    SETTINGS,
    TERMSANDACONDITIONS,
    PRIVACYPOLICY,
    COOKIEPREFERENCES,
    ORGERROR,
    PASSWORDSUCCESS
  }
} = constants;
const cookies = new Cookies();

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const initializeResponse = useSelector(
    state => state.orgReducer.initilizeOrg,
    shallowEqual
  );

  useEffect(() => {
    if (initializeResponse.result === null &&
      !initializeResponse.fetching
    ) {
      dispatch(initilizeOrg());
    }
  }, [initializeResponse]);

  useEffect(() => {
    if (initializeResponse.result) {
      if (initializeResponse.result.status === 200) {
        const { tenant } = initializeResponse.result;
        const { clientId, poolId, region, loginModes, authDomain } = tenant;
        Amplify.configure({
          aws_cognito_region: region,
          aws_user_pools_id: poolId,
          aws_user_pools_web_client_id: clientId,
          Auth: {
            userPoolId: poolId,
            region: region
          },
          oauth: {
            domain: `${authDomain}.auth.ap-south-1.amazoncognito.com`,
            clientId: clientId,
            redirectSignIn: window.location.origin + LOGIN,
            redirectSignOut: window.location.origin + LOGIN,
            responseType: "token",
            scope: ["openid", "email"]
          }
        });
        cookies.set("loginMode", loginModes[0]);
        if (location.pathname === ORGERROR) {
          history.push(LOGIN);
        }
      }
      if (initializeResponse.result.status === 400) {
        history.push(ORGERROR);
      }
    } else if (initializeResponse.error) {
      history.push(ORGERROR);
    }
  }, [initializeResponse, initilizeOrg]);

  useEffect(() => {
    if (getRemainingTimeForToken() <= 0) {
      cookies.remove("elToken");
      history.push(LOGIN);
    }
  }, [location.pathname]);

  return (
    <MainLayout
      component={
        <Suspense fallback={<RouteLoader />}>
          <Switch>
            {
              checkForValidToken()
                ? <Switch>
                    <Route path={HOME} component={Home} />
                    <Route path={CONTACT_US} component={Pages} />
                    <Route path={SETTINGS} component={Pages} />
                    <Route path={TERMSANDACONDITIONS} component={Pages} />
                    <Route path={PRIVACYPOLICY} component={Pages} />
                    <Route path={COOKIEPREFERENCES} component={Pages}
                     />
                    <Route path={ONBOARD} component={Onboard} />
                    <Route path={VIEWONBOARD} component={Onboard} />
                    <Route exact
                      path={`${EDITORG}/:orgCode`}
                      component={Onboard}
                    />
                    <Route path={ONBOARDEMPLOYEE} component={EmpOnboard} />
                    <Route path={VIEWALLEMPLOYEE} component={EmpOnboard} />
                    <Redirect path="*" to={HOME} component={Home} />
                  </Switch>
                : <Switch>
                  <Route exact
                    path={`${FORGOT_PASSWORD}/:orgId`}
                    component={Auth}
                  />
                  <Route exact path={`${CHANGEPASSWORD}/:username`}
                  component={Auth} />
                  <Route exact
                    path={`${ACTIVATEACCOUNT}/:authToken`}
                    component={Auth}
                  />
                  <Route exact
                    path={PASSWORDSUCCESS}
                    component={Auth}
                  />
                   <Route path={ORGERROR} component={Auth} />
                   <Route path={RESETPASSWORD} component={Auth} />
                  <Route path={LOGIN} component={Auth} />
                  <Redirect path="*" to={LOGIN} component={Auth} />
                </Switch>
            }
          </Switch>
        </Suspense>
      }
      userAuthorized={checkForValidToken()}
    />
  );
};

export default withRouter(App);
