import React, { Component } from "react";
import classes from "./Game.module.css";

class Game extends Component {
  state = {
    jumping: true
  };

  jump = event => {
    let object =
      event.target.parentElement.parentElement.children[0].children[1];
    let player =
      event.target.parentElement.parentElement.children[0].children[0];
    let platform =
      event.target.parentElement.parentElement.children[0].children[3];
    let game = event.target.parentElement.parentElement.children[0];

    if (this.state.jumping) {
      object.style.transform = "translate(-1020px)";
      this.setState({
        jumping: false
      });
      let jumpingInterval = setTimeout(() => {
        this.setState({
          jumping: !this.state.jumping
        });
        clearTimeout(jumpingInterval);
      }, 1400);
    }

    this.moving(object, player, platform, game);
  };

  moving = (object, player, platform, game) => {
    let objectPosition = object.getBoundingClientRect();
    let playerPosition = player.getBoundingClientRect();
    let platformPosition = platform.getBoundingClientRect();
    let gamePosition = game.getBoundingClientRect();
    let stop = false;
    let move = null;

    let touchesX =
      objectPosition.x < playerPosition.width + playerPosition.x &&
      objectPosition.x > playerPosition.x;
    let touchesY =
      playerPosition.y + playerPosition.height === platformPosition.y ||
      playerPosition.y + playerPosition.height > platformPosition.y + 20;

    if (touchesX && touchesY) {
      console.log("stop");
      stop = true;
    }

    if (objectPosition.x <= gamePosition.x) {
      console.log("stop");
      stop = true;
    }

    stop
      ? (move = null)
      : (move = setTimeout(() => {
          this.moving(object, player, platform, game);
          clearTimeout(move);
        }, 50));
  };

  render() {
    let playerClasses = [classes.dino];
    if (this.state.jumping) {
      playerClasses = [classes.dino];
    } else {
      playerClasses = [classes.dino, classes.jump].join(" ");
    }
    let player = <div className={playerClasses} />;

    return (
      <div className={classes.container}>
        <div className={classes.game}>
          {player}
          <div className={classes.object} />
          <div className={classes.screen} />
          <div className={classes.platform} />
        </div>
        <div className={classes.controls}>
          <button className={classes.jump} onClick={this.jump}>
            JUMP
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
