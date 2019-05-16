import React, { Component } from "react";
import classes from "./Game.module.css";

class Game extends Component {

  state = {
    jumpStatus: true,
    objectStyle: {},
    dinoClasses: [classes.dino].join(" "),
  }

  game = event => {
    let jumpStatus = [...this.state.jumpStatus];
    let objectStyle = [...this.state.objectStyle];
    let dinoClasses = [...this.state.dinoClasses];

    if (jumpStatus) {
      jumpStatus = false;
      if (event.keyCode === 32) {
        objectStyle = {
          transform: "translateX(-1200px)",
        };

        dinoClasses = [classes.dino, classes.jump].join(" ");

        let timeoutJump = setTimeout(() => {
          dinoClasses = [classes.dino].join(" ");
          jumpStatus = true;
          clearTimeout(timeoutJump);
        }, 1.4 * 1000);
      }
    }
    this.setState({
      jumpStatus,
      objectStyle,
      dinoClasses
    })
  }

  render() {
    // let game = document.querySelector('.game');
    // let dino = document.querySelector('.dino');
    // let body = document.querySelector('body');
    // let object = document.querySelector('.object');
    // let modalWindow = document.querySelector('.modal-window');
    // let movePosition = 0;


    // modalWindow.addEventListener('click', () => {
    //   modalWindow.style.display = "none";
    //   object.style.transform = "translateX(0px)";
    // });

    // let objectMove = setInterval(() => {
    //   let objectPosition = object.getBoundingClientRect();
    //   let dinoPosition = dino.getBoundingClientRect();

    //   if (objectPosition.x.toFixed(0) < 101 && objectPosition.x.toFixed(0) > 43) {
    //     if (dinoPosition.y.toFixed(0) == 593 || dinoPosition.y.toFixed(0) > 570) {
    //       modalWindow.style.display = "flex";
    //     }
    //   }

    //   if (objectPosition.x <= 0) {
    //     clearInterval(objectMove);
    //     console.log("objectMove interval have cleared");
    //   }
    // }, .02 * 1000);
    return (
      <div className={classes.container} onKeyDown={this.game}>
        <div className={classes.game}>
          <div className={this.state.dinoClasses}/>
          <div className={classes.object} style={this.state.objectStyle} />
          <div className={classes.platform} />
        </div>
        {/* <div class="modal-window">
          <h1>Game over</h1>
          <div class="restart"></div>
        </div> */}
      </div>
    );
  }
}

export default Game;
