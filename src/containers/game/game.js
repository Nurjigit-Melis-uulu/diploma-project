import React, { Component } from "react";
import classes from "./Game.module.css";

class Game extends Component {
  state = {
    jumping: true,
    modalWindow: false,
    start: false
  };

  jump = event => {
    let instance = event.target.parentElement.parentElement;
    let object = instance.children[0].children[1];
    let player = instance.children[0].children[0];
    let platform = instance.children[0].children[3];
    let game = instance.children[0];
    let grass = instance.children[0].children[3].firstChild;
    let grass2 = instance.children[0].children[3].lastChild;

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

    if (this.state.start === false) {
      this.animationDecoration(grass, grass2, game);
      this.moving(object, player, platform, game, grass);
      this.setState({
        start: true
      });
    }
  };

  animationDecoration = (grass, grass2, game) => {
    let grassPos = grass.getBoundingClientRect();
    let grass2Pos = grass2.getBoundingClientRect();
    let gamePosition = game.getBoundingClientRect();
    let anima = false;
    let anima2 = false;
    let touchesGr1 =
      grassPos.right === gamePosition.right ||
      grassPos.left === gamePosition.left ||
      grassPos.left === gamePosition.right;
    let touchesGr2 =
      grass2Pos.right === gamePosition.right ||
      grass2Pos.left === gamePosition.left ||
      grass2Pos.left === gamePosition.right;

    if (touchesGr1) {
      grass.style.left = "-1000px";
    }
    if (touchesGr2) {
      grass2.style.left = "-1000px";
    }

    if (grassPos.right === gamePosition.left) {
      grass.style.transition = "none";
      grass.style.left = "1000px";
      anima = true;
    }
    if (grass2Pos.right === gamePosition.left) {
      grass2.style.transition = "none";
      grass2.style.left = "1000px";
      anima2 = true;
    }

    let move = setTimeout(() => {
      if (anima) {
        grass.style.transition = "all 15.5s linear";
        grass.style.left = "0";
        anima = false;
      }
      if (anima2) {
        grass2.style.transition = "all 15.5s linear";
        grass2.style.left = "0";
        anima2 = false;
      }
      this.animationDecoration(grass, grass2, game);
      clearTimeout(move);
    }, 100);
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
      console.log("stop, because object hit player!");
      stop = true;
      this.setState({
        modalWindow: true
      });
    }

    if (objectPosition.x <= gamePosition.x) {
      console.log("stop");
      stop = true;
      this.setState({
        modalWindow: true
      });
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
    let modalWindow = null;
    if (this.state.modalWindow) {
      modalWindow = (
        <div className={classes.modalWindow}>
          <h1>Game over</h1>
          <div className={classes.restart} />
        </div>
      );
    } else {
      modalWindow = null;
    }

    let classesGrass = [classes.grass, classes.grass1].join(" ");

    return (
      <div className={classes.container}>
        <div className={classes.game}>
          {player}
          <div className={classes.object} />
          <div className={classes.screen} />
          <div className={classes.platform}>
            <div className={classes.grass} />
            <div className={classesGrass} />
          </div>
        </div>
        <div className={classes.controls}>
          <button className={classes.jump} onClick={this.jump} />
        </div>
        {modalWindow}
      </div>
    );
  }
}

export default Game;
