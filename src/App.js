import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import axios from "./axios";

import "./App.css";
import Game from "./containers/Game/Game";
import Menu from "./components/Pages/Menu/Menu";
import LevelsPage from "./components/Pages/LevelsPage/LevelsPage";

class App extends Component {
  componentDidMount() {
    axios
      .get("")
      .then(response => {
        this.props.onAddLevels(response.data)
      })
      .catch(error => {});
  }

  render() {
    return (
      <div className="App">
        <Route path="/Menu" component={Menu} />
        <Route path="/LevelsPage" component={LevelsPage} />
        <Route path="/" exact component={Game} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddLevels: data => dispatch({ type: "ADD_LEVELS", data })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
