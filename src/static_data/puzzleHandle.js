import Assistant from "../components/Assistant";

// All of the static data are subject to
// future modification, e.x to be retrieved from the server
// game_state = 
// dead = not initialized
// active = during a question
// paused = during a question but paused

const puzzleHandler = {
    game_status: 'dead',
    assistant : {
        visibility: 1,
        roaming:1,
        position: {top:'80%',left:'40%'},
        tips: null
      },
      questionBox: {

      },
      optionBox: {
          
      }
  };
  
  export default puzzleHandler;
  