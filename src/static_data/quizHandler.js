import Assistant from "../components/Assistant";

// All of the static data are subject to
// future modification, e.x to be retrieved from the server
// game_state =
// innactive = not initialized
// active = during a question
// paused = during a question but paused
// defeat = player lost

const puzzleHandler = {
  game_status: "innactive",
  correct_answers: 0,
  max_answers: 30,
  current_score: 0,
  timeout: 30,
  time_spent: 0,
  highscore: 0,
  url: "http://jservice.io/api/random",
  cached_questions: {},
  assistant: {
    visibility: 1,
    roaming: 0,
    positionTop: "60%",
    positionLeft: "40%",
    tips: null,
    persistent_tips: "Click on me to <b> start the game </b>"
  }
};

export default puzzleHandler;
