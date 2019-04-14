import {
    FETCH_QUIZ_STATIC_DATA,
    START_THE_QUIZ
} from './types';

import quizHandlerStaticData from "../static_data/quizHandler";

export const fetchQuizStaticData = () => dispatch => {
    dispatch({
      type: FETCH_QUIZ_STATIC_DATA,
      payload: {
        quizHandlerStaticData: quizHandlerStaticData
      }
    });
  };

  export const startTheQuiz = () => dispatch => {
    dispatch({
      type: START_THE_QUIZ,
      payload: {
        game_status: 'active',
        assistant: {
          persistent_tips: null,
          roaming: 1
        }
      }
    });
  };