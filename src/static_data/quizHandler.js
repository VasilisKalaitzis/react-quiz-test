import Assistant from "../components/Assistant";

// All of the static data are subject to
// future modification, e.x to be retrieved from the server
// game_state = 
// innactive = not initialized
// active = during a question
// paused = during a question but paused
// defeat = player lost

const puzzleHandler = {
    game_status: 'innactive',
    correct_answers: 0,
    current_score: 0,
    timeout: 30,
    assistant : {
        visibility: 1,
        roaming:0,
        position: {top:'60%', left:'40%'},
        tips: null,
        persistent_tips: 'Click on me to <b> start the game </b>'
      }
  };
  
  export default puzzleHandler;
  