import React from "react";
import Canvas from "./Canvas";
import { useEffect, useState } from "react";
let pathP1 = new Path2D();
let id = null;
let a = 1;
let pathBuffer = [];

function App() {
  clearInterval(id);
  let x = 250;
  let y = 250;
  let prevX = 250;
  let prevY = 250;
  let movingLeft = false;
  let movingRight = false;
  useEffect(() => {
    const keydown = (e) => {
      if (e.key == "ArrowRight") {
        movingRight = true;
      }
      if (e.key == "ArrowLeft") {
        movingLeft = true;
      }
    };
    const keyup = (e) => {
      if (e.key == "ArrowRight") {
        movingRight = false;
      }
      if (e.key == "ArrowLeft") {
        movingLeft = false;
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
    if (ctx.isPointInStroke(pathP1, x, y)) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "blue";
    }
    ctx.lineCap = "round";
    newPath.moveTo(prevX, prevY);
    newPath.lineTo(x, y);
    ctx.stroke(newPath);
    pathBuffer.push(newPath);
    if (pathBuffer.length >= 10) {
      pathP1.addPath(pathBuffer.shift());
    }
  };

  const move = () => {
    prevX = x;
    prevY = y;
    if (movingLeft) {
      a -= 0.2;
    }
    if (movingRight) {
      a += 0.2;
    }
    x += 4 * Math.cos(a);
    y += 4 * Math.sin(a);
  };
  id = setInterval(move, 50);

  return <Canvas draw={draw} />;
}

export default App;
