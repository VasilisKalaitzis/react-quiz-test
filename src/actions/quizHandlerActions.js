import {
  FETCH_QUIZ_STATIC_DATA,
  START_THE_QUIZ,
  UPDATE_QUIZ_PROPERTY,
  FETCH_NEW_QUESTION,
  MODIFY_SCORE
} from "./types";

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
  dispatch(fetchNewQuestion());
  dispatch({
    type: START_THE_QUIZ,
    payload: {
      assistant: {
        persistent_tips: null,
        roaming: 1
      }
    }
  });
};
export const updateQuizProperty = (property, value) => dispatch => {
  dispatch({
    type: UPDATE_QUIZ_PROPERTY,
    payload: {
      property: property,
      value: value
    }
  });
};

export const fetchNewQuestion = () => (dispatch, getState) => {
  let { cached_questions, url } = getState().quizHandlerReducer;
  //pull from server only if the client doesn't have it

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (cached_questions[data[0].id] != 1) {
        cached_questions[data[0].id] = 1;
        dispatch({
          type: FETCH_NEW_QUESTION,
          payload: {
            current_question: data[0]
          }
        });
      } else {
        dispatch(fetchNewQuestion());
      }
    });
};

export const submitAnswer = answer => (dispatch, getState) => {
  let {
    current_question,
    correct_answers,
    max_answers
  } = getState().quizHandlerReducer;

  //pull from server only if the client doesn't have it
  if (
    answer.toLowerCase() === current_question.answer.toLowerCase() &&
    correct_answers < max_answers
  ) {
    // increase score
    dispatch({
      type: MODIFY_SCORE,
      payload: {
        modify_type: "increase"
      }
    });
    // show next question
    dispatch(fetchNewQuestion());
  } else if (correct_answers >= max_answers) {
    // show win message
    dispatch(fetchNewQuestion());
  } else {
    dispatch({
      type: MODIFY_SCORE,
      payload: {
        modify_type: "increase"
      }
    });
    // show lose message
    dispatch(fetchNewQuestion());
  }
};
