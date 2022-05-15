import React from "react";
import Canvas from "./Canvas";
import { Header } from "./Header";
import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const colors = {
    purple: "#9B5DE5",
    pink: "#F15BB5",
    yellow: "#FEE440",
    blue: "#00BBF9",
    green: "#00F5D4",
  };
  let stateRef = useRef({
    x: 250,
    y: 250,
    prevX: 250,
    prevY: 250,
    movingLeft: false,
    movingRight: false,
    pathP1: new Path2D(),
    pathP2: new Path2D(),
    a: 1,
    pathBuffer: [],
    colorP1: colors.purple,
    lostCount: 0,
  });
  let state = stateRef.current;

  useEffect(() => {
    const keydown = (e) => {
      if (e.key == "ArrowRight") {
        state.movingRight = true;
      }
      if (e.key == "ArrowLeft") {
        state.movingLeft = true;
      }
      if (e.key == "d") {
        state.movingRight2 = true;
      }
      if (e.key == "a") {
        state.movingLeft2 = true;
      }
    };
    const keyup = (e) => {
      if (e.key == "ArrowRight") {
        state.movingRight = false;
      }
      if (e.key == "ArrowLeft") {
        state.movingLeft = false;
      }
      if (e.key == "d") {
        state.movingRight2 = false;
      }
      if (e.key == "a") {
        state.movingLeft2 = false;
      }
    };
    window.addEventListener("keydown", keydown);
    window.addEventListener("keyup", keyup);

    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("keyup", keyup);
    };
  });
  const intervalRef = useRef();

  let onStart = () => {
    if (!intervalRef.current) {
      const id = setInterval(move, 50);
      intervalRef.current = id;
    }
  };
  let stopGame = () => clearInterval(intervalRef.current);

  const draw = (ctx, frameCount) => {
    ctx.lineWidth = 10;
    let newPath = new Path2D();
    if (state.x2) {
      let newPath2 = new Path2D();
      newPath2.moveTo(state.prevX2, state.prevY2);
      newPath2.lineTo(state.x2, state.y2);
      ctx.strokeStyle = state.colorP2;
      ctx.stroke(newPath2);
      state.pathBuffer2.push(newPath2);
      if (state.pathBuffer2.length >= 10) {
        state.pathP2.addPath(state.pathBuffer2.shift());
      }
      if (ctx.isPointInStroke(state.pathP2, state.x2, state.y2)) {
        if (intervalRef.current) {
          state.lostCount2 += 1;
          if (state.lostCount2 > 8) {
            stopGame();
          }
        }
      }
      if (ctx.isPointInStroke(state.pathP1, state.x2, state.y2)) {
        if (intervalRef.current) {
          state.lostCount2 += 1;
          if (state.lostCount2 > 8) {
            stopGame();
          }
        }
      }
    }

    ctx.lineCap = "round";
    newPath.moveTo(state.prevX, state.prevY);
    newPath.lineTo(state.x, state.y);
    ctx.strokeStyle = state.colorP1;
    ctx.stroke(newPath);
    state.pathBuffer.push(newPath);
    if (state.pathBuffer.length >= 10) {
      state.pathP1.addPath(state.pathBuffer.shift());
    }
    if (ctx.isPointInStroke(state.pathP2, state.x, state.y)) {
      if (intervalRef.current) {
        state.lostCount += 1;
        if (state.lostCount > 8) {
          stopGame();
        }
      }
    }
    if (ctx.isPointInStroke(state.pathP1, state.x, state.y)) {
      if (intervalRef.current) {
        state.lostCount += 1;
        if (state.lostCount > 8) {
          stopGame();
        }
      }
    }
  };

  const move = () => {
    state.prevX = state.x;
    state.prevY = state.y;
    if (state.movingLeft) {
      state.a -= 0.2;
    }
    if (state.movingRight) {
      state.a += 0.2;
    }
    state.x += 4 * Math.cos(state.a);
    state.y += 4 * Math.sin(state.a);
    if (state.x2) {
      state.prevX2 = state.x2;
      state.prevY2 = state.y2;
      if (state.movingLeft2) {
        state.a2 -= 0.2;
      }
      if (state.movingRight2) {
        state.a2 += 0.2;
      }
      state.x2 += 4 * Math.cos(state.a2);
      state.y2 += 4 * Math.sin(state.a2);
    }
  };

  let initPlayer2 = () => {
    state.x2 = 350;
    state.y2 = 350;
    state.prevX2 = 350;
    state.prevY2 = 350;
    state.movingLeft2 = false;
    state.movingRight2 = false;
    state.pathP2 = new Path2D();
    state.a2 = 1;
    state.pathBuffer2 = [];
    state.colorP2 = colors.green;
    state.lostCount2 = 0;
  };

  let pickColors = (color, player) => {
    if (player == "P1") {
      state.colorP1 = color;
    }
    if (player == "P2") {
      state.colorP2 = color;
    }
  };

  return (
    <div className="App">
      <Header
        onStart={onStart}
        initPlayer2={initPlayer2}
        pickColors={pickColors}
        colors={colors}
        state={state}
      />
      <Canvas draw={draw} />
    </div>
  );
}

export default App;
