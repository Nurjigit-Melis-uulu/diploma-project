import React, { Component } from "react";
import classes from "./Game.module.css";

class Game extends Component {
  state = {
    jumping: true,
    object: null,
    player: null,
    platform: null,
    game: null
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

    console.log(object, player, platform, game);
    this.moving(object, player, platform, game);
  };

  moving = (object, player, platform, game) => {
    let objectPosition = object.getBoundingClientRect();
    let playerPosition = player.getBoundingClientRect();
    let platformPosition = platform.getBoundingClientRect();
    let gamePosition = game.getBoundingClientRect();
    let stop = false;
    let move = null;

    if (
      objectPosition.x < playerPosition.width + playerPosition.x &&
      objectPosition.x > playerPosition.x
    ) {
      if (
        playerPosition.y + playerPosition.height === platformPosition.y ||
        playerPosition.y + playerPosition.height > platformPosition.y + 20
      ) {
        console.log("objectsMove interval have cleared in condition");
        stop = true;
      }
    }

    if (objectPosition.x <= gamePosition.x) {
      console.log("objectsMove interval have cleared");
      stop = true;
    }

    stop
      ? (move = null)
      : (move = setTimeout(() => {
          clearTimeout(move);
          this.moving(object, player, platform, game);
        }, 1000));
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
