import { combineReducers } from "redux";
import layoutReducer from "./layoutReducer";
import quizHandlerReducer from "./quizHandlerReducer";

export default combineReducers({
  layoutReducer: layoutReducer,
  quizHandlerReducer: quizHandlerReducer
});
