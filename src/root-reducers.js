import { combineReducers } from "redux";

import appReducer from "./reducers/reducers";
import orgReducer from "./reducers/orgReducers";
import dashboardReducer from "./reducers/dashboardReducers";
import empReducer from "./reducers/empReducers";

const appReducers = combineReducers({
  appReducer,
  orgReducer,
  dashboardReducer,
  empReducer
});

export default appReducers;
