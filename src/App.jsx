import React from "react";
import Canvas from "./Canvas";
import { Header } from "./Header";
import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  let stateRef = useRef({
    x: 250,
    y: 250,
    prevX: 250,
    prevY: 250,
    movingLeft: false,
    movingRight: false,
    pathP1: new Path2D(),
    a: 1,
    pathBuffer: [],
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
  const draw = (ctx, frameCount) => {
    ctx.lineWidth = 10;
    let newPath = new Path2D();
    if (state.x2) {
      let newPath2 = new Path2D();
      newPath2.moveTo(state.prevX2, state.prevY2);
      newPath2.lineTo(state.x2, state.y2);
      ctx.stroke(newPath2);
      state.pathBuffer2.push(newPath2);
      if (state.pathBuffer2.length >= 10) {
        state.pathP2.addPath(state.pathBuffer2.shift());
      }
      if (ctx.isPointInStroke(state.pathP2, state.x2, state.y2)) {
        console.log("coucou");
      } else {
        ctx.strokeStyle = "blue";
      }
    }
    if (ctx.isPointInStroke(state.pathP1, state.x, state.y)) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "blue";
    }
    ctx.lineCap = "round";
    newPath.moveTo(state.prevX, state.prevY);
    newPath.lineTo(state.x, state.y);
    ctx.stroke(newPath);
    state.pathBuffer.push(newPath);
    if (state.pathBuffer.length >= 10) {
      state.pathP1.addPath(state.pathBuffer.shift());
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

  const intervalRef = useRef();

  let onStart = () => {
    if (!intervalRef.current) {
      const id = setInterval(move, 50);
      intervalRef.current = id;
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
  };

  return (
    <div className="App">
      <Header onStart={onStart} initPlayer2={initPlayer2} />
      <Canvas draw={draw} />
    </div>
  );
}

export default App;
