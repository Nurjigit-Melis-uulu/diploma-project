import React, { Component } from "react";
import classes from "./Game.module.css";

class Game extends Component {
  state = {
    jumping: false,
  };

  jump = () => {
    this.setState({
      jumping: !this.state.jumping
    })
    let jumpingInterval = setTimeout(() => {
      this.setState({
        jumping: !this.state.jumping
      })
      clearTimeout(jumpingInterval);
    }, 1400)
  }

  render() {
    let playerClasses = [classes.dino];
    if (this.state.jumping) {
      playerClasses = [classes.dino, classes.jump].join(" ");
    } else {
      playerClasses = [classes.dino];
    }
    let player = <div className={playerClasses}></div>
    return (
      <div className={classes.container} >
        <div className={classes.game}>
          {player}
          <div className={classes.object} />
          <div className={classes.platform} />
        </div>
        <div className={classes.controls}>
          <button className={classes.jump} onClick={this.jump}>Jump</button>
        </div>
      </div>
    );
  }
}

export default Game;
