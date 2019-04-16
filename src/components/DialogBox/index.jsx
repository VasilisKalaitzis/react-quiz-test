import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DialogBox extends Component {
  constructor(props) {
    super(props);

    this.elementRefs = {};
  }
  componentWillMount() {}

  handleSubmit = name => {
    let value = this[`textInput${name}`].value;
    this[`textInput${name}`].value = "";
    return value;
  };

  renderRow(row) {
    const { onTickle } = this.props;

    switch (row.type) {
      case "textbox":
        return (
          <input
            className="flexcontainer-block"
            type="text"
            ref={input => {
              this[`textInput${row.name}`] = input;
            }}
          />
        );
      case "submit":
        return (
          <div
            className="flexcontainer-block action-button"
            onClick={() =>
              onTickle({
                action: row.action,
                text: this.handleSubmit(row.target_name)
              })
            }
          >
            {row.text}
          </div>
        );
      case "callback":
        return (
          <div
            className="flexcontainer-block action-button"
            onClick={() =>
              onTickle({
                action: row.action
              })
            }
          >
            {row.text}
          </div>
        );
      default:
        return <span>{row.text}</span>;
    }
  }
  render() {
    return (
      <div
        className={
          "dialog-box-grid container-margin " + this.props.container_class
        }
      >
        <div className="dialog-header">
          <span dangerouslySetInnerHTML={{ __html: this.props.header }} />
        </div>
        <ul className="dialog-body flexcontainer-fit">
          {this.props.body !== undefined
            ? this.props.body.map(row => {
                return (
                  <li key={"dialog_body_" + row.text}>{this.renderRow(row)}</li>
                );
              })
            : null}
        </ul>
        <div vallign="bottom" className="dialog-footer flexcontainer-fit">
          {this.props.footer !== undefined
            ? this.props.footer.map(row => {
                return (
                  <React.Fragment key={"dialog_body_" + row.text}>
                    {this.renderRow(row)}
                  </React.Fragment>
                );
              })
            : null}
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
