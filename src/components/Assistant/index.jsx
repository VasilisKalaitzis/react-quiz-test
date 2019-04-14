import React, { Component } from "react";
import { TimelineMax } from "gsap/TweenMax";
import PropTypes from "prop-types";
// import { Grid, Cell } from "styled-css-grid";

import "../../css/Assistant.css";

class Assistant extends Component {
  constructor(props) {
    super(props);
    // reference to the DOM node
    this.wingsTimeline = null;
    // reference to the animation
    this.wingsTimeline = null;
  }

  componentDidMount() {
    //initialize cubic movement by value
    if (this.props.info.roaming===1) {
      this.cubicMovement();
    }
    //Initializing wing movement
    this.wingsMovement();
  }
  componentDidUpdate() {
    //re-initialize cubic movement by value
    if (this.props.info.roaming===1) {
      this.cubicMovement();
    }
  }

  render() {
    const styles = {
      cubicContainerStyle: {
        display: this.props.info.visibility ? "block" : "none"
      }
    };

    return (
      <div
        className="cubic-container"
        ref={c => (this.cubicContainer = c)}
        style={styles.cubicContainerStyle}
      >
        <div
          className="cubic"
          ref={c => (this.cubic = c)}
          style={this.props.info.position}
          click="giveFeedback"
        >
          <div className="cubic-grid"
          >
            {/* <Cell left={1} top={1} width={4} height={1}> */}
              {/* <BubbleChat msg={this.props.info.tips} /> */}
            {/* </Cell> */}
              <div className="cubic-body" />
              <div
                className="cubic-left-wing"
                ref={c => (this.cubicWing1 = c)}
              />
              <div
                className="cubic-right-wing"
                ref={c => (this.cubicWing2 = c)}
              />
          </div>
        </div>
      </div>
    );
  }

  cubicMovement() {
    const {roaming} = this.props.info;
    const { cubicContainer, cubic} = this;

    this.cubicTimeline = new TimelineMax({
      onComplete: () => roaming===1 ?this.cubicMovement() : this.pause
    });

    this.cubicTimeline.to(cubic, 2, {
      top: this.randomHeight(cubicContainer),
      left: this.randomWidth(cubicContainer),
      ease: "Back.easeOut"
    });
  }
  wingsMovement() {
    const { cubicWing1, cubicWing2 } = this;
    this.wingsTimeline = new TimelineMax({
      onComplete: () => this.wingsTimeline.restart()
    });
    this.wingsTimeline.to([cubicWing1], 1, {
      skewY: 10,
      ease: "Elastic.easeOut"
    });
    this.wingsTimeline.to([cubicWing2], 1, {
      skewY: -10,
      ease: "Elastic.easeOut"
    });
  }

  randomHeight(container) {
    var height = container.offsetHeight;
    var randomHeight = Math.floor(Math.random() * (height - 20));
    return randomHeight;
  }
  randomWidth(container) {
    var width = container.offsetWidth;
    var randomWidth = Math.floor(Math.random() * (width - 20));
    return randomWidth;
  }
}

Assistant.defaultProps = {
  info: {
    visibility:1,
    roaming:0,
  }
};

Assistant.propTypes = {
  info: PropTypes.object
};
export default Assistant;
