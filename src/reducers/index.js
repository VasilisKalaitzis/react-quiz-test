import { combineReducers } from "redux";
import layoutReducer from "./layoutReducer";
import quizHandlerRecuder from './quizHandlerReducer';

export default combineReducers({
  layoutReducer: layoutReducer,
  quizHandlerRecuder: quizHandlerRecuder
});
