import {
  FETCH_QUIZ_STATIC_DATA,
  START_THE_QUIZ,
  UPDATE_QUIZ_PROPERTY,
  FETCH_NEW_QUESTION,
  MODIFY_SCORE,
  END_THE_QUIZ
} from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZ_STATIC_DATA:
      //get static data for layout
      let quizHandlerStaticData = action.payload.quizHandlerStaticData;

      // if highscore has already been set, add it
      if (localStorage.getItem("react-quiz-highscore-vk") != undefined) {
        quizHandlerStaticData.highscore = parseInt(
          localStorage.getItem("react-quiz-highscore-vk")
        );
      }
      return quizHandlerStaticData;
    case START_THE_QUIZ:
      return {
        ...state,
        assistant: {
          ...state.assistant,
          roaming: action.payload.assistant.roaming,
          persistent_tips: action.payload.assistant.persistent_tips
        }
      };
    case UPDATE_QUIZ_PROPERTY:
      return {
        ...state,
        [action.payload.property]: action.payload.value
      };
    case FETCH_NEW_QUESTION:
      return {
        ...state,
        time_spent: 0,
        game_status: "active",
        current_question: action.payload.current_question,
        cached_questions: action.payload.cached_questions,
        assistant: {
          ...state.assistant,
          persistent_tips: action.payload.current_question.category.title
        }
      };
    case MODIFY_SCORE:
      let currentScore =
        state.current_score + Math.pow(2, state.correct_answers);
      let correctAnswers = state.correct_answers + 1;

      let highscore;
      if (currentScore > state.highscore) {
        highscore = currentScore;
        localStorage.setItem("react-quiz-highscore-vk", currentScore);
      } else {
        highscore = state.highscore;
      }

      return {
        ...state,
        correct_answers: correctAnswers,
        current_score: currentScore,
        highscore: highscore
      };
    case END_THE_QUIZ:
      let tips;
      action.payload.game_result == "victory"
        ? (tips = "Bravo!")
        : (tips = "You will do it better next time!");
      return {
        ...state,
        game_status: "finished",
        game_result: action.payload.game_result,
        game_text: action.payload.game_text,
        assistant: {
          ...state.assistant,
          persistent_tips: tips
        }
      };
    default:
      return state;
  }
}
