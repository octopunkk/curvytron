import React from "react";

export let AI = (props) => {
  let state = props.state;
  let self = state.players[1];
  let opponent = state.players[0];

  let stopTurning = (ms) => {
    setTimeout(() => {
      self.movingLeft = false;
      self.movingRight = false;
    }, ms);
  };

  let randomAction = () => {
    let time = Math.random();
    let direction = Math.floor(Math.random() * 2);
    if (direction == 0) {
      self.movingLeft = true;
      stopTurning(time * 2000);
    }
    if (direction == 1) {
      self.movingRight = true;
      stopTurning(time * 2000);
    }
  };

  let wallDistance = () => {
    let topWallDist = self.y;
    let bottomWallDist = 500 - self.y;
    let rightWallDist = 500 - self.x;
    let leftWallDist = self.x;
    return Math.min(topWallDist, bottomWallDist, rightWallDist, leftWallDist);
  };

  let avoidWall = () => {
    let wDist = wallDistance();
    if (wDist < 90) {
      console.log("ATTENTION");
      self.movingLeft = true;
      stopTurning(100);
      if (wallDistance() < wDist) {
        self.movingRight = true;
        stopTurning(700);
      }
      if (wallDistance() > wDist) {
        self.movingLeft = true;
        stopTurning(700);
      }
    } else {
      randomAction();
    }
  };

  setInterval(avoidWall, 700);
};
