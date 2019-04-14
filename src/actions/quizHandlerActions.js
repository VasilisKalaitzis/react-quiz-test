import {
    FETCH_QUIZ_STATIC_DATA
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