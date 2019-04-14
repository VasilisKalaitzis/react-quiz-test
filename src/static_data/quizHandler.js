import Assistant from "../components/Assistant";

// All of the static data are subject to
// future modification, e.x to be retrieved from the server
// game_state = 
// dead = not initialized
// active = during a question
// paused = during a question but paused
// defeat = player lost

const puzzleHandler = {
    game_status: 'dead',
    correct_answers: 0,
    current_score: 0,
    assistant : {
        visibility: 1,
        roaming:0,
        position: {top:'60%'},
        tips: null,
        persistent_tips: 'Click on me to <b> start the game </b>'
      },
      questionBox: {
        active:1
      },
      informationBox: {
        active:1
      }
  };
  
  export default puzzleHandler;
  