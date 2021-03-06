import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import axios from "./axios";

import "./App.css";
import Game from "./containers/Game/Game";
import Menu from "./components/Pages/Menu/Menu";
import LevelsPage from "./components/Pages/LevelsPage/LevelsPage";

class App extends Component {
  state = {
    levels: [
      {
        level: 1,
        difficulty: 1,
        time: 60
      },
      {
        level: 2,
        difficulty: 1,
        time: 90
      },
      {
        level: 3,
        difficulty: 1,
        time: 120
      },
      {
        level: 4,
        difficulty: 1,
        time: 120
      },
      {
        level: 5,
        difficulty: 1,
        time: 150
      }
    ]
  }

  componentDidMount() {
    axios
      .get("/levels.json")
      .then(response => {
        let array = [];
        let levels = response.data;
        
        for (const key in levels) {
          if (levels.hasOwnProperty(key)) {
            const element = levels[key];
            console.log(element);
            array.push(element);
          }
        }
        this.props.onAddLevels([...array]);
      })
      .catch(error => {});
  }

  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Menu} />
        <Route path="/Levels" component={LevelsPage} />
        <Route path="/Game" component={Game} />
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
