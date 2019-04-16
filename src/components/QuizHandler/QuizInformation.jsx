import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  updateQuizProperty,
  endTheQuiz
} from "../../actions/quizHandlerActions";

class QuizInformation extends Component {
  constructor() {
    super();
    this.countdown = null;
  }
  componentWillMount() {
    this.handleTimer();
  }
  componentWillUnmount() {
    this.stopTimer();
  }

  handleTimer() {
    // every 1 second check and update count
    if (
      this.props.time_spent < this.props.timeout &&
      this.props.time_spent !== undefined
    ) {
      let newTimeSpent = this.props.time_spent + 1;
      this.props.updateQuizProperty("time_spent", newTimeSpent);
    } else {
      // this.props.endTheQuiz("defeat", "Game over! <br> You ran out of time!");
    }
    this.countdown = setTimeout(() => this.handleTimer(), 1000);
  }
  stopTimer() {
    clearTimeout(this.countdown);
  }
  resetTimer() {
    this.time_spent = 0;
  }

  renderRow(row) {
    switch (row.type) {
      case "textbox":
        return <input key="dialog_body_textbox" type="text" />;
      default:
        return <li key={"dialog_body_" + row.text}>{row.text}</li>;
    }
  }
  render() {
    const { onTickle } = this.props;
    return (
      <div
        className={
          "dialog-box-grid container-margin " + this.props.containerClass
        }
      >
        <div className="dialog-header">
          <div className="flexcontainer-inline">
            <div className="flexcontainer-block flex-6 info-block normal-fa-fonts ">
              <div className="info-text">
                <FontAwesomeIcon icon="star" />
              </div>
              <div className="info-text">{this.props.current_score}</div>
            </div>
            <div className="flexcontainer-block flex-6 info-block normal-fa-fonts ">
              <div className="info-text">
                <FontAwesomeIcon icon="hourglass-start" />
              </div>
              <div className="info-text">
                {this.props.timeout - this.props.time_spent}
              </div>
            </div>
            <div className="flexcontainer-block flex-6 info-block normal-fa-fonts ">
              <div className="info-text">
                <FontAwesomeIcon icon="level-up-alt" />
              </div>
              <div className="info-text">
                {Math.pow(2, this.props.correct_answers)}
              </div>
            </div>
            <div className="flexcontainer-block flex-6 info-block normal-fa-fonts ">
              <div className="info-text">
                <FontAwesomeIcon icon="trophy" />
              </div>
              <div className="info-text">{this.props.highscore}</div>
            </div>
          </div>
        </div>
        <div vallign="bottom" className="dialog-footer flexcontainer-fit">
          <span
            className="flexcontainer-block action-button"
            onClick={() => onTickle({ action: "reset_game" })}
          >
            Reset
          </span>
        </div>
      </div>
    );
  }
}
QuizInformation.defaultProps = {};

QuizInformation.propTypes = {
  containerClass: PropTypes.string,
  timeout: PropTypes.number,
  correct_answers: PropTypes.number,
  current_score: PropTypes.number,
  highscore: PropTypes.number
};
const mapStateToProps = state => ({
  time_spent: state.quizHandlerReducer.time_spent,
  timeout: state.quizHandlerReducer.timeout,
  correct_answers: state.quizHandlerReducer.correct_answers,
  current_score: state.quizHandlerReducer.current_score,
  highscore: state.quizHandlerReducer.highscore
});

export default connect(
  mapStateToProps,
  { updateQuizProperty, endTheQuiz }
)(QuizInformation);
