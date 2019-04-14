import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  fetchQuizStaticData,
  startTheQuiz
} from "../../actions/quizHandlerActions";


import Assistant from "../Assistant/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DialogBox from './DialogBox';

class QuizHandler extends Component {
  constructor() {
    super();
    this.countdown = null;
    this.time_spent = 0;
  }
  componentWillMount() {
    // Time to handle time countdown
    this.props.fetchQuizStaticData();
  }

    componentWillUnmount() {
      this.stopTimer()
    }

    startTimer() {
      // every 1 second check and update count
      if (this.time_spent >= this.props.timeout) {
        //do something
      } else {
        this.time_spent++;
        this.countdown = setTimeout(()=>this.startTimer(), 1000);
      }
    }
    stopTimer() {
      clearTimeout(this.countdown);
    }
    resetTimer() {
      this.time_spent = 0;
    }
    getTimeLeft() {
      return null;
    }
    resetQuiz() {
    // set quizhandlerData to static Data
    this.props.fetchQuizStaticData();
  }
  startQuiz() {
    // set cubic roaming to 1
    // set persisten_tips to null
    // set game_status to active 
    this.props.startTheQuiz();
  }
  endQuiz() {
    // set game_status to finished
  }
  submitAnswer() {
    // validate answer

    // if wrong then endQuiz() and set message to Bad
    // update tips

    // if corrent and correct_answers >= max_questions then endQuiz()
    // and message to Good
    // update tips

    // if correct then asknextquestion()
    // update tips
  }
  askNextQuestion() {
// pull next question(), no checks required here
  }
  // timer() {

  // }


  handleActionButton = (feedback) => {
    switch (feedback) {
      case 'start_game':
        this.startQuiz();
        this.startTimer();
        break;
      case 'reset_game':
        this.resetQuiz();
        break;
      default:
        break;
    }
  };

  renderQuestionBox(game_status = 'innactive') {
    return (
    <CSSTransition
      in={game_status === 'active'}
      classNames={
        "slide-down"
      }
      unmountOnExit
      timeout={500}
    >
          <DialogBox 
          header='Question 1'
          key='questGiver'
          body={[{text:"wouldyou", type:'textbox'}]}
          footer={[{text:"Submit"}]}
          containerClass="dialog-box color-pallete1 shadow-pallete1"
          ></DialogBox>
      </CSSTransition>
    );
  }

  renderInformationBox(game_status = 'innactive') {
    return (    
    <CSSTransition
      in={game_status === 'active'}
      classNames={
        "slide-up"
      }
      unmountOnExit
      timeout={1500}
    >    
      <div className={'dialog-box-grid container-margin ' + this.props.containerClass}>
          <div className='dialog-header'>
            <div className='flexcontainer-inline'>
              <div 
                  className="flexcontainer-block flex-6 normal-fa-fonts ">            
                  <span className='block-padding'>0</span>
                <FontAwesomeIcon
                  icon="star"
                />
              </div>
              <div 
                  className="flexcontainer-block flex-6 normal-fa-fonts ">        
                  <span className='block-padding'>{(this.props.timeout - this.time_spent)}</span>
                <FontAwesomeIcon
                  icon="hourglass-start"
                />
              </div>
              <div 
                  className="flexcontainer-block flex-6 normal-fa-fonts ">        
                  <span className='block-padding'>0</span>
                <FontAwesomeIcon
                  icon="level-up-alt"
                />
              </div>
              <div 
                  className="flexcontainer-block flex-6 normal-fa-fonts ">        
                  <span className='block-padding'>0</span>
                <FontAwesomeIcon
                  icon="trophy"
                />
              </div>
            </div>
          </div>
          <div vallign='bottom' className='dialog-footer flexcontainer-fit'>
              <span className='flexcontainer-block action-button'
              onClick={() => this.handleActionButton('reset_game')}>Reset</span>
          </div>
        </div> 
      </CSSTransition>
  );
  }
  render() {
    const styles= {
      opaqueBlock: {
        opacity:'0.8'
      }
    }
    return (
      <div className='flexcontainer-inline'>
        {/* Main Frame */}
        <div className='flexcontainer-block xs-12' 
            style={styles.opaqueBlock}>
          {this.renderQuestionBox(this.props.game_status)}
        </div>
        {/* Helper */}
        {/* IMPORTANT: this was a dialogBox and a dialogBox should became again */}
        {/* I am not confident that I will be able to complete this in 1.5 days */}
        {/* For now, I am leaving this as it is */}
        <div className='flexcontainer-block xs-12'>
            {this.renderInformationBox(this.props.game_status)}
        </div>
        
        <div className='flexcontainer-block xs-12'>
              <Assistant
                info={this.props.assistant}
                feedback='start_game'
                onTickle={this.handleActionButton}
              />
              </div>
      </div>
            
    );
  }
}
QuizHandler.defaultProps = {
  game_status: 'innactive',
  correct_answers: 0,
  current_score: 0,
  timeout: 30,
  assistant : {
      visibility: 1,
      roaming:0,
      position: {top:'60%'},
      tips: null,
      persistent_tips: null
    }
};

QuizHandler.propTypes = {
  game_status: PropTypes.string,
  correct_answers: PropTypes.number,
  current_score: PropTypes.number,
  timeout: PropTypes.number,
  assistant: PropTypes.object
};
const mapStateToProps = state => ({
  game_status: state.quizHandlerRecuder.game_status,
  correct_answers: state.quizHandlerRecuder.correct_answers,
  current_score: state.quizHandlerRecuder.current_score,
  timeout: state.quizHandlerRecuder.timeout,
  assistant: state.quizHandlerRecuder.assistant
});
export default connect(
  mapStateToProps,
 {fetchQuizStaticData, startTheQuiz}
)(QuizHandler);
