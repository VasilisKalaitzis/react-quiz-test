import React, { Component } from "react";
import PropTypes from "prop-types";

import "../../css/BubbleChat.css";

class BubbleChat extends Component {
  render() {
    return (
        this.props.tips !== null? 
        <div className="bubble-chat caligraphy2">
            <span dangerouslySetInnerHTML={{ __html: this.props.tips }}/>
        </div>
        : null
    )
  }

}

BubbleChat.defaultProps = {
  tips: null
};

BubbleChat.propTypes = {
  tips: PropTypes.string
};
export default BubbleChat;
