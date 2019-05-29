import React, { Component } from "react";

import bgSvg from "../../assets/image/mountains.svg";
import run from "../../assets/image/run.png";
import classes from "./Game.module.css";

class Game extends Component {
  state = {
    x: 0,
    score: 0,
    delay: true,
    nitro: false,
    start: false,
    jumping: true,
    hitPoint: 100,
    restart: false,
    playerPosX: 20,
    modalWindow: false,
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
      }, 2000);
    }

    if (this.state.start === false) {
      this.animationDecoration(grass, grass2, game, screen);
      this.checkHits(screen, player, platform, game);
      this.scoreCounter();
      this.setState({ start: true });
    }
  };

  checkHits = (screen, player, platform, game) => {
    let playerPosition = player.getBoundingClientRect();
    let platformPosition = platform.getBoundingClientRect();
    let move = null;
    let objectInScreen = screen.children[0].children;
    let objectInScreen2 = screen.children[1].children;
    let touchesY =
      playerPosition.y + playerPosition.height === platformPosition.y ||
      playerPosition.y + playerPosition.height > platformPosition.y + 20;

    for (const iterator of objectInScreen) {
      const element = iterator.getBoundingClientRect();

      let touchesX =
        element.right <= playerPosition.right && element.x >= playerPosition.x;

      if (touchesX && touchesY) {
        console.log("object hit player!");
        this.setState({
          hitPoint: this.state.hitPoint - 1
        });
      }
    }

    for (const iterator of objectInScreen2) {
      const element = iterator.getBoundingClientRect();

      let touchesX =
        element.right <= playerPosition.right && element.x >= playerPosition.x;

      if (touchesX && touchesY) {
        console.log("object hit player!");
        this.setState({
          hitPoint: this.state.hitPoint - 1
        });
      }
    }

    if (this.state.hitPoint <= 0) {
      this.setState({
        modalWindow: true,
        stop: true
      });
    }

    this.state.modalWindow
      ? (move = null)
      : (move = setTimeout(() => {
          this.checkHits(screen, player, platform, game);
          clearTimeout(move);
        }, 10));
  };

  animationDecoration = (grass, grass2, game, screen) => {
    let screenMove1 = screen.children[0];
    let screenMove2 = screen.children[1];
    let grassPos = grass.getBoundingClientRect();
    let grass2Pos = grass2.getBoundingClientRect();
    let gamePosition = game.getBoundingClientRect();
    let screenMove1Pos = screenMove1.getBoundingClientRect();
    let screenMove2Pos = screenMove2.getBoundingClientRect();
    let touchesGr1 =
      grassPos.right === gamePosition.right ||
      grassPos.left === gamePosition.left ||
      grassPos.left === gamePosition.right;
    let touchesGr2 =
      grass2Pos.right === gamePosition.right ||
      grass2Pos.left === gamePosition.left ||
      grass2Pos.left === gamePosition.right;
    let anima = false;
    let anima2 = false;
    let move = null;

    if (screenMove1Pos.left >= gamePosition.right) {
      this.addObjects(screenMove1);
      screenMove1.style.transition = "all 15.5s linear";
      screenMove1.style.left = "-2000px";
    }
    if (this.state.delay) {
      this.setState({
        delay: false
      });
      this.addObjects(screenMove2);
      screenMove2.style.transition = "all 23.25s linear";
      screenMove2.style.left = "-2000px";
    } else if (screenMove2Pos.left >= gamePosition.right) {
      this.addObjects(screenMove2);
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
    if (this.state.x === 2632) {
      this.setState({
        x: 0
      });
    } else {
      this.setState({
        x: this.state.x + 188
      });
    }

    this.state.modalWindow
      ? (move = null)
      : (move = setTimeout(() => {
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
        }, 50));
  };

  restartGame = () => {
    this.setState({
      x: 0,
      score: 0,
      start: false,
      hitPoint: 100,
      playerPosX: 0,
      restart: false,
      modalWindow: false,
    });
  };

  addObjects = element => {
    if (element.firstChild) {
      element.innerHTML = "";
    }
    let block = document.createElement("div");
    block.className = `${classes.object}`;
    block.style.left = `${(Math.random() * 1000).toFixed(0)}px`;
    let block1 = document.createElement("div");
    block1.className = `${classes.object}`;
    block1.style.left = `${(Math.random() * 1000).toFixed(0)}px`;
    element.append(block);
    element.append(block1);
  };

  scoreCounter = () => {
    if (this.state.modalWindow === false) {
      this.setState({
        score: this.state.score + 1
      });
    } else {
      return;
    }

    let scoreCounter = setTimeout(() => {
      this.scoreCounter();
      clearTimeout(scoreCounter);
    }, 500);
  };

  nitro = element => {
    let o = 5000;
    if (this.state.delay === false) {
      element.style.left = `${this.state.playerPosX}px`;
      setTimeout(() => {
        this.setState({
          nitro: true
        });
      }, 1000);
    }
    let time = setTimeout(() => {
      this.time();
      this.setState({
        nitro: false
      });
      clearTimeout(time);
    }, o);
  };

  nitroClick = () => {
    this.setState({
      playerPosX: this.state.playerPosX + 100
    });
  };

  render() {
    let playerClasses = [classes.dino];
    if (this.state.jumping) {
      playerClasses = [classes.dino];
    } else {
      playerClasses = [classes.dino, classes.jump].join(" ");
    }
    let modalWindow = null;
    if (this.state.modalWindow) {
      modalWindow = (
        <div className={classes.modalWindow}>
          <h1>Game over</h1>
          <div className={classes.restart} onClick={this.restartGame} />
        </div>
      );
    } else {
      modalWindow = null;
    }

    let classesGrass = [classes.grass, classes.grass1].join(" ");

    return (
      <div className={classes.container}>
        <div className={classes.game}>
          <div
            className={playerClasses}
            style={{ left: this.state.playerPosX }}
          >
            <img
              src={run}
              alt="horse"
              style={{ marginLeft: -this.state.x + "px" }}
            />
          </div>
          <div className={classes.staticScreen}>
            <div className={classes.moveScreen} />
            <div className={classes.moveScreen1} />
          </div>
          <div className={classes.screen} />
          <div className={classes.platform}>
            <div className={classes.grass} />
            <div className={classesGrass} />
          </div>
          <img src={bgSvg} alt="mountains" className={classes.bg} />
          <div
            className={classes.dino}
            style={{ left: "780px" }}
          >
            <img
              src={run}
              alt="horse"
              style={{ marginLeft: -this.state.x + "px" }}
            />
          </div>
        </div>
        <div className={classes.controls}>
          <button className={classes.jump} onClick={this.jump} />
          <button
            className={classes.nitro}
            onClick={this.nitroClick}
            disabled={this.state.nitro}
          >
            nitro
          </button>
        </div>
        {modalWindow}
        <div className={classes.hitBox}>
          <div className={classes.hitPoint}>
            <span>{this.state.hitPoint}%</span>
          </div>
        </div>
        <div className={classes.score}>
          <span>Score: {this.state.score}</span>
        </div>
      </div>
    );
  }
}

export default Game;
