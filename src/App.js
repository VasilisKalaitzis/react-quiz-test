import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";

import Layout from "./components/Layout";

import "./css/App.css";
import "./css/Base.css";
import "./css/transitions.css";
import "./css/fonts.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faHourglassStart,
  faTrophy,
  faLevelUpAlt
} from "@fortawesome/free-solid-svg-icons";

library.add(faStar,faHourglassStart,faTrophy,faLevelUpAlt);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App color-pallete4">
          <Layout />
        </div>
      </Provider>
    );
  }
}

export default App;
