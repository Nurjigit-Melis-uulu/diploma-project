import React, { Component } from "react";
import classes from "./Game.module.css";

class Game extends Component {
  state = {
    jumping: true,
    modalWindow: false,
    start: false,
    delay: true
  };

  jump = event => {
    let instance = event.target.parentElement.parentElement.children[0];
    let screen = instance.children[1];
    let player = instance.children[0];
    let platform = instance.children[3];
    let game = instance;
    let grass = instance.children[3].firstChild;
    let grass2 = instance.children[3].lastChild;

    if (this.state.jumping) {
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
      this.animationDecoration(grass, grass2, game, screen);
      this.checkHits(screen, player, platform, game);
      this.setState({
        start: true
      });
    }
  };

  checkHits = (screen, player, platform, game) => {
    let playerPosition = player.getBoundingClientRect();
    let platformPosition = platform.getBoundingClientRect();
    let stop = false;
    let move = null;

    stop
      ? (move = null)
      : (move = setTimeout(() => {
          this.checkHits(screen, player, platform, game);
          clearTimeout(move);
        }, 50));
  };

  animationDecoration = (grass, grass2, game, screen) => {
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
    let screenMove1 = screen.children[0];
    let screenMove2 = screen.children[1];
    let screenMove1Pos = screenMove1.getBoundingClientRect();
    let screenMove2Pos = screenMove2.getBoundingClientRect();

    if (screenMove1Pos.left >= gamePosition.right) {
      screenMove1.style.transition = "all 15.5s linear";
      screenMove1.style.left = "-2000px";
    }
    if (this.state.delay) {
      this.setState({
        delay: false
      });
      screenMove2.style.transition = "all 23.25s linear";
      screenMove2.style.left = "-2000px";
    } else if (screenMove2Pos.left >= gamePosition.right) {
      screenMove2.style.transition = "all 15.5s linear";
      screenMove2.style.left = "-2000px";
    }
    if (screenMove1Pos.right === gamePosition.left) {
      screenMove1.style.transition = "none";
      screenMove1.style.left = "0";
    }
    if (screenMove2Pos.right === gamePosition.left) {
      screenMove2.style.transition = "none";
      screenMove2.style.left = "0";
    }

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
      clearTimeout(move);
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
      this.animationDecoration(grass, grass2, game, screen);
    }, 50);
  };

  addObjects = element => {
    let block = document.createElement("div");
    block.className = `${classes.object}`;
    element.append(block);
    element.append(block);
    element.append(block);
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
          <div className={classes.staticScreen}>
            <div className={classes.moveScreen} />
            <div className={classes.moveScreen1} />
          </div>
          <div className={classes.screen} />
          <div className={classes.platform}>
            <div className={classes.grass} />
            <div className={classesGrass} />
          </div>
        </div>
        <div className={classes.controls}>
          <button className={classes.jump} onMouseDown={this.jump} />
        </div>
        {modalWindow}
      </div>
    );
  }
}

export default Game;
