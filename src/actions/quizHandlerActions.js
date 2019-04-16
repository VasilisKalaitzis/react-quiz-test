import {
  FETCH_QUIZ_STATIC_DATA,
  START_THE_QUIZ,
  UPDATE_QUIZ_PROPERTY,
  FETCH_NEW_QUESTION,
  MODIFY_SCORE,
  END_THE_QUIZ
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

        // Remove all html characters
        data[0].answer = data[0].answer.replace(/(<([^>]+)>)/gi, "");

        dispatch({
          type: FETCH_NEW_QUESTION,
          payload: {
            current_question: data[0],
            cached_questions: cached_questions
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

  // strip HTML from the given answer
  answer = answer.replace(/(<([^>]+)>)/gi, "");

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
    dispatch(endTheQuiz("victory", "Congratulations! <br> You won the game!"));
  } else {
    // show lose message
    dispatch(
      endTheQuiz(
        "defeat",
        "GAME OVER! <br>'" +
          answer +
          "' is wrong. \n The correct answer is '" +
          current_question.answer +
          "'"
      )
    );
  }
};

// Finish the quiz
// result_text is the text that will be displayed in the end
export const endTheQuiz = (result, text) => dispatch => {
  dispatch({
    type: END_THE_QUIZ,
    payload: {
      game_text: text,
      game_result: result
    }
  });
};
