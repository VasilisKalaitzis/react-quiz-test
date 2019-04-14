import {
    FETCH_QUIZ_STATIC_DATA
  } from "../actions/types";

  const initialState = {
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_QUIZ_STATIC_DATA:
        //get static data for layout
        return action.payload.quizHandlerStaticData;
      default:
        return state;
    }
  }
  