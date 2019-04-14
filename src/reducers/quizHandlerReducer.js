import {
    FETCH_QUIZ_STATIC_DATA,
    START_THE_QUIZ
  } from "../actions/types";

  const initialState = {
  };

  export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZ_STATIC_DATA:
            //get static data for layout
            return action.payload.quizHandlerStaticData;
        case START_THE_QUIZ:
            return {
                ...state,
                game_status: action.payload.game_status,
                assistant: {
                    ...state.assistant,
                    roaming: action.payload.assistant.roaming,
                    persistent_tips: action.payload.assistant.persistent_tips
                }
            }
        default:
            return state;
    }
  }
  