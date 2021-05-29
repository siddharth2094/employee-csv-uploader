import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";
import loadingReducer from "./loadingReducer";

const rootReducer = combineReducers({
  employeeReducer,
  loadingReducer,
});

export default rootReducer;
