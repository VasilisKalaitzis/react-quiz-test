import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchQuizStaticData
} from "../../actions/quizHandlerActions";


import Assistant from "../Assistant/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DialogBox from './DialogBox';

class QuizHandler extends Component {
  componentWillMount() {
    this.props.fetchQuizStaticData();
    }

  restartQuiz() {

  }
  startQuiz() {

  }
  endQuiz() {

  }
  submitAnswer() {

  }
  askNextQuestion() {

  }

  renderQuestionBox(active = 0) {
    return (
      active === 1 ?
      <DialogBox 
      header='Question 1'
      key='questGiver'
      body={[{text:"wouldyou", type:'textbox'}]}
      footer={[{text:"Submit"}]}
      containerClass="dialog-box color-pallete1 shadow-pallete1"
      ></DialogBox>
      : null
    );
  }

  renderInformationBox(active = 0) {
    return (    
      active === 1 ?      
        <div className={'dialog-box-grid container-margin ' + this.props.containerClass}>
        <div className='dialog-header flexcontainer-fit'>
            <span 
                className="normal-fa-fonts ">            
                <span className='block-padding'>0</span>
              <FontAwesomeIcon
                icon="star"
              />
            </span>
            <span 
                className="normal-fa-fonts ">        
                <span className='block-padding'>30</span>
              <FontAwesomeIcon
                icon="hourglass-start"
              />
            </span>
        </div>
        <div vallign='bottom' className='dialog-footer flexcontainer-fit'>
            <span className='flexcontainer-block'>Reset</span>
        </div>
      </div> 
      : null
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
          {this.renderQuestionBox(this.props.questionBox.active)}
        </div>
        {/* Helper */}
        {/* IMPORTANT: this was a dialogBox and a dialogBox should became again */}
        {/* I am not confident that I will be able to complete this in 1.5 days */}
        {/* For now, I am leaving this as it is */}
        <div className='flexcontainer-block xs-12'>
            {this.renderInformationBox(this.props.informationBox.active)}
        </div>
        
        <div className='flexcontainer-block xs-12'>
              <Assistant
                info={this.props.assistant}
              />
              </div>
      </div>
            
    );
  }
}
QuizHandler.defaultProps = {
  game_status: 'dead',
  correct_answers: 0,
  current_score: 0,
  assistant : {
      visibility: 1,
      roaming:0,
      position: {top:'60%'},
      tips: null,
      persistent_tips: null
    },
  questionBox : {},
  informationBox: {}
};

QuizHandler.propTypes = {
  game_status: PropTypes.string,
  correct_answers: PropTypes.number,
  assistant: PropTypes.object,
  questionBox: PropTypes.object,
  informationBox: PropTypes.object
};
const mapStateToProps = state => ({
  game_status: state.quizHandlerRecuder.game_status,
  correct_answers: state.quizHandlerRecuder.correct_answers,
  assistant: state.quizHandlerRecuder.assistant,
  questionBox: state.quizHandlerRecuder.questionBox,
  informationBox: state.quizHandlerRecuder.informationBox
});
export default connect(
  mapStateToProps,
 {fetchQuizStaticData}
)(QuizHandler);
