import React, { Component } from "react";

import bgSvg from "../../assets/image/mountains.svg";
import classes from "./Game.module.css";

class Game extends Component {
  state = {
    score: 0,
    delay: true,
    start: false,
    jumping: true,
    hitPoint: 100,
    restart: false,
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
      }, 1400);
    }

    if (this.state.start === false) {
      this.animationDecoration(grass, grass2, game, screen);
      this.checkHits(screen, player, platform, game);
      this.scoreCounter();
      this.setState({
        start: true
      });
    }
  };

  checkHits = (screen, player, platform, game) => {
    let object1 = screen.children[0].firstChild.getBoundingClientRect();
    let object2 = screen.children[1].firstChild.getBoundingClientRect();
    let playerPosition = player.getBoundingClientRect();
    let platformPosition = platform.getBoundingClientRect();
    let stop = false;
    let move = null;

    let touchesX =
      (object1.x <= playerPosition.right &&
        object1.x >= playerPosition.x) ||
      (object2.x <= playerPosition.right &&
        object2.x >= playerPosition.x);
    let touchesY =
      playerPosition.y + playerPosition.height === platformPosition.y ||
      playerPosition.y + playerPosition.height > platformPosition.y + 20;

    if (touchesX && touchesY) {
      console.log("object hit player!");
      this.setState({
        hitPoint: this.state.hitPoint - 2
      });
    }

    if (this.state.hitPoint === 0) {
      stop = true;
      this.setState({
        modalWindow: true
      });
    }

    stop
      ? (move = null)
      : (move = setTimeout(() => {
          this.checkHits(screen, player, platform, game);
          clearTimeout(move);
        }, 50));
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
      if (this.state.restart) {
        grass.style.left = "0";
        grass2.style.left = "1000px";
        grass.style.transition = "all 15.5s linear";
        grass2.style.transition = "all 15.5s linear";
      } else {
        this.animationDecoration(grass, grass2, game, screen);
      }
    }, 50);
  };

  restartGame = () => {
    this.setState({
      score: 0,
      start: false,
      hitPoint: 100,
      restart: false,
      modalWindow: false,
    })
  }

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
          <div className={classes.restart} onClick={this.restartGame} />
        </div>
      );
    } else {
      modalWindow = null;
    }

    let classesGrass = [classes.grass, classes.grass1].join(" ");
    let hitPoint = (
      <div className={classes.hitPoint}>
        <span>{this.state.hitPoint}%</span>
      </div>
    );
    let bg = <img src={bgSvg} alt="mountains" className={classes.bg} />;
    let scoreShow = <span>Score: {this.state.score}</span>;

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
          {bg}
        </div>
        <div className={classes.controls}>
          <button className={classes.jump} onMouseDown={this.jump} />
        </div>
        {modalWindow}
        <div className={classes.hitBox}>{hitPoint}</div>
        <div className={classes.score}>{scoreShow}</div>
      </div>
    );
  }
}

export default Game;
