import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import Game from './containers/Game/Game';
import Menu from './components/Pages/Menu/Menu';
import LevelsPage from './components/Pages/LevelsPage/LevelsPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/Menu" exact component={Menu} />
        <Route path="/LevelsPage" component={LevelsPage} />
        <Route path="/" component={Game} />
      </div>
    );
  }
}

export default App;
