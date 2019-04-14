import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Assistant from "../Assistant/index";

import DialogBox from './DialogBox';

class PuzzleHandler extends Component {
  componentWillMount() {
    // this.props.fetchMovieDetails(this.props.url, this.props.movieId);
  }

  renderCast() {
    // return this.props.movieDetails!==undefined? <MovieCast url={this.props.url} movieId={this.props.movieId} movieCast={this.props.movieDetails._embedded.cast}/>: null;
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
        <DialogBox 
            header='Question 1'
            body={[{text:"wouldyou"}]}
            footer={[{text:"Submit"}]}
            containerClass="dialog-box color-pallete1 shadow-pallete1"
        ></DialogBox>
        </div>
        {/* Left Helper */}
        <div className='flexcontainer-block xs-12'>
        <DialogBox 
            header='Score'
            body={[]}
            footer={[{text:"Time left"}, {text:"Reset"}]}
            containerClass="color-pallete4"
        ></DialogBox>
        </div>
        
        <div className='flexcontainer-block xs-12'>
              <Assistant
                info={{
                  visibility: 1,
                  roaming:1,
                  position: {top:'80%',left:'40%'},
                  tips: null
                }}
              />
              </div>
      </div>
            
    );
  }
}
// PuzzleHandler.defaultProps = {
//   movieId: null
// };

// PuzzleHandler.propTypes = {
//   movieId: PropTypes.number
// };
// const mapStateToProps = state => ({
//   movieDetails: state.movieReducer.movieDetails
// });
export default connect(
  null,
 null
)(PuzzleHandler);
