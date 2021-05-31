import { combineReducers } from "redux";
import global from "./global";
import { actionType } from "../utils";

export default combineReducers<any, actionType<any>>({
  global: global,
});
