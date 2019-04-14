import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import '../../css/DialogBox.css'

class DialogBox extends Component {
  componentWillMount() {
    // this.props.fetchMovieDetails(this.props.url, this.props.movieId);
  }

  renderCast() {
    // return this.props.movieDetails!==undefined? <MovieCast url={this.props.url} movieId={this.props.movieId} movieCast={this.props.movieDetails._embedded.cast}/>: null;
  }
  render() {
    return (
      <div className={'dialog-box-grid container-margin ' + this.props.containerClass}>
        <div className='dialog-header'>
            <span>{this.props.header}</span>
        </div>
        <ul className='dialog-body'>
            {this.props.body!== undefined ? this.props.body.map(row=>{
                return <span>{row.text}</span>;
            }
            ) : null}
        </ul>
        <div vallign='bottom' className='dialog-footer flexcontainer-fit'>
        {this.props.footer!== undefined ? this.props.footer.map(row=>{
                return <span className='flexcontainer-block'>{row.text}</span>;}
            ) : null}
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
)(DialogBox);
