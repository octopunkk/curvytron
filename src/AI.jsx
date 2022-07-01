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
      self.movingRight = false;
    }
    if (direction == 1) {
      self.movingRight = true;
      self.movingLeft = false;
    }
  };

  let wallDistance = () => {
    let topWallDist = self.y;
    let bottomWallDist = 500 - self.y;
    let rightWallDist = 500 - self.x;
    let leftWallDist = self.x;
    return Math.min(topWallDist, bottomWallDist, rightWallDist, leftWallDist);
  };
  let precWDist = wallDistance();

  let distanceSelf = () => {};

  let avoidWall = () => {
    let wDist = wallDistance();
    if (wDist < 70) {
      if (Math.abs(wDist - precWDist) < 5) {
        self.movingLeft = true;
        self.movingRight = false;
      } else if (wDist < precWDist) {
        if (self.movingRight) {
          self.movingLeft = true;
          self.movingRight = false;
        } else {
          self.movingRight = true;
          self.movingLeft = false;
        }
      } else if (wDist > precWDist) {
        if (self.movingLeft) {
          self.movingLeft = true;
          self.movingRight = false;
        } else {
          self.movingRight = true;
          self.movingLeft = false;
        }
      }
      precWDist = wDist;
    } else {
      randomAction();
    }
  };

  setInterval(avoidWall, 50);
};
