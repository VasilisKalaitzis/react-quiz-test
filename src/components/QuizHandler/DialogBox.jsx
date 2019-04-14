import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import '../../css/DialogBox.css'

class DialogBox extends Component {
  componentWillMount() {
    // this.props.fetchMovieDetails(this.props.url, this.props.movieId);
  }

  renderRow(row) {
    switch (row.type) {
    case 'textbox': 
      return <input key='dialog_body_textbox' type='text'></input>;
    default:
      return <li key={'dialog_body_' + row.text}>{row.text}</li>
    }
  }
  render() {
    return (
      <div className={'dialog-box-grid container-margin ' + this.props.containerClass}>
        <div className='dialog-header'>
            <span>{this.props.header}</span>
        </div>
        <ul className='dialog-body'>
            {this.props.body!== undefined ? this.props.body.map(row=>{
                return this.renderRow(row);
            }
            ) : null}
        </ul>
        <div vallign='bottom' className='dialog-footer flexcontainer-fit'>
        {this.props.footer!== undefined ? this.props.footer.map(row=>{
                return <span key={'footer' + row.text} className='flexcontainer-block'>{row.text}</span>;}
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
