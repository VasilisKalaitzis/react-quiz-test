import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLayoutData } from "../actions/layoutActions";

import NavBar from "./Navbar/index";
import PuzzleHandler from "./QuizHandler/index";
import "../css/Layout.css";

class Layout extends Component {
  componentWillMount() {
    this.props.fetchLayoutData();
  }

  retrieveValue(obj, index) {
    return obj !== undefined ? obj[index] : null;
  }
  render() {
    // Render the main Layout
    return (
      <div className="main-layout-grid">
        <div className="navbar-container">
          <NavBar key="navbar" info={this.props.layout.navbar} />
        </div>
        <div className="right-sidebar-container" />

        {/* Main Container containing the quiz view and mechanics */}
        <div className="main-container">
          <PuzzleHandler />
        </div>

        <div className="footer-container" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  layout: state.layoutReducer.layout
});

export default connect(
  mapStateToProps,
  { fetchLayoutData }
)(Layout);
