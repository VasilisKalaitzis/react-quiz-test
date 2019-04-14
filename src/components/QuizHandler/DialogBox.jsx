import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import '../../css/DialogBox.css'

class DialogBox extends Component {
  componentWillMount() {
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
                return <span key={'footer' + row.text} className='flexcontainer-block action-button'>{row.text}</span>;}
            ) : null}
        </div>
      </div>
    );
  }
}
DialogBox.defaultProps = {
  header: null,
  body: [],
  footer: []
};

DialogBox.propTypes = {
  header: PropTypes.string,
  body: PropTypes.array,
  footer: PropTypes.array
};
// const mapStateToProps = state => ({
//   movieDetails: state.movieReducer.movieDetails
// });
export default connect(
  null,
 null
)(DialogBox);
