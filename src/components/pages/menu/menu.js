import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Menu.module.css";

function Menu(props) {
  return (
    <div className={classes.Menu}>
      <div className={classes.content}>
        <h1>Kyz-kuumay</h1>
        <span>The Kyrgyz national game</span>
        <div className={classes.menuControl}>
          <NavLink to="/LevelsPage">Start game</NavLink>
          <NavLink to="/AboutGame">About the game</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Menu;
