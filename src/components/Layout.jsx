import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLayoutData } from "../actions/layoutActions";

import NavBar from "./Navbar/index";
import PuzzleHandler from './PuzzleHandler/index';
import "../css/Layout.css"

class Layout extends Component {
  componentWillMount() {
    this.props.fetchLayoutData();
  }

  retrieveValue(obj, index) {
    return obj !== undefined ? obj[index] : null;
  }
  render() {
    return (
      <div className="main-layout-grid">
        <div className='navbar-container'>
            <NavBar key="navbar" info={this.props.layout.navbar} />
        </div>
        <div className='right-sidebar-container'></div>
        
        {/* Main Container */}
        <div className='main-container'>
          <PuzzleHandler></PuzzleHandler>
        </div>

        <div className='footer-container'>
</div>
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
