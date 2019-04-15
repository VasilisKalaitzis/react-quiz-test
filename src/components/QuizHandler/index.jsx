import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  fetchQuizStaticData,
  startTheQuiz,
  submitAnswer
} from "../../actions/quizHandlerActions";

import Assistant from "../Assistant/index";
import DialogBox from "./DialogBox";
import QuizInformation from "./QuizInformation";
import "../../css/DialogBox.css";
import "../../css/QuizHandler.css";

class QuizHandler extends Component {
  constructor() {
    super();
    this.countdown = null;
  }
  componentWillMount() {
    // Time to handle time countdown
    this.props.fetchQuizStaticData();
  }

  startQuiz() {
    // set cubic roaming to 1
    // set persisten_tips to null
    // set game_status to active
    this.props.startTheQuiz();
  }
  resetQuiz() {
    // set quizhandlerData to static Data
    this.props.fetchQuizStaticData();
  }
  endQuiz() {
    // set game_status to finished
  }

  handleActionButton = feedback => {
    switch (feedback.action) {
      case "start_game":
        this.startQuiz();
        break;
      case "reset_game":
        this.resetQuiz();
        break;
      case "submit_answer":
        // validate answer
        // if wrong then endQuiz() and set message to Bad
        // update tips
        // if corrent and correct_answers >= max_questions then endQuiz()
        // and message to Good
        // update tips
        // if correct then asknextquestion()
        // update tips
        this.props.submitAnswer(feedback.text);
        break;
      default:
        break;
    }
  };

  renderQuestionBox(game_status = "innactive") {
    return (
      <CSSTransition
        in={game_status === "active"}
        classNames={"slide-down"}
        unmountOnExit
        timeout={500}
      >
        <DialogBox
          header={this.props.current_question.question}
          key="questGiver"
          onTickle={this.handleActionButton}
          body={[{ text: "Enter Answer", type: "textbox", name: "answer" }]}
          footer={[
            {
              text: "Submit",
              type: "submit",
              action: "submit_answer",
              target_name: "answer"
            }
          ]}
          container_class="dialog-box color-pallete1 shadow-pallete1"
        />
      </CSSTransition>
    );
  }

  renderInformationBox(game_status = "innactive") {
    return (
      <CSSTransition
        in={game_status === "active"}
        classNames={"slide-up"}
        unmountOnExit
        timeout={700}
      >
        <QuizInformation
          key="quizInformation"
          onTickle={this.handleActionButton}
          container_class="dialog-box color-pallete1 shadow-pallete1"
        />
      </CSSTransition>
    );
  }
  render() {
    const styles = {
      opaqueBlock: {
        opacity: "0.8"
      }
    };
    return (
      <React.Fragment>
        <div className="flexcontainer-inline block-width">
          {/* Main Frame */}
          <div className="flexcontainer-block xs-12" style={styles.opaqueBlock}>
            {this.renderQuestionBox(this.props.game_status)}
          </div>
          {/* Helper */}
          {/* IMPORTANT: this was a dialogBox and a dialogBox should became again */}
          {/* I am not confident that I will be able to complete this in 1.5 days */}
          {/* For now, I am leaving this as it is */}
          <div className="flexcontainer-block xs-12">
            {this.renderInformationBox(this.props.game_status)}
          </div>
        </div>
        <Assistant
          info={this.props.assistant}
          feedback={{ action: "start_game" }}
          onTickle={this.handleActionButton}
        />
      </React.Fragment>
    );
  }
}
QuizHandler.defaultProps = {
  current_question: {
    category: {}
  }
};

QuizHandler.propTypes = {
  game_status: PropTypes.string,
  correct_answers: PropTypes.number,
  current_score: PropTypes.number,
  assistant: PropTypes.object,
  current_question: PropTypes.object
};
const mapStateToProps = state => ({
  game_status: state.quizHandlerReducer.game_status,
  correct_answers: state.quizHandlerReducer.correct_answers,
  current_score: state.quizHandlerReducer.current_score,
  assistant: state.quizHandlerReducer.assistant,
  current_question: state.quizHandlerReducer.current_question
});
export default connect(
  mapStateToProps,
  { fetchQuizStaticData, startTheQuiz, submitAnswer }
)(QuizHandler);
