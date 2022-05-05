import React from "react";
import Canvas from "./Canvas";
import { useEffect, useState } from "react";
let pathP1 = new Path2D();

function App() {
  let x = 250;
  let y = 250;
  let prevX = 250;
  let prevY = 250;
  useEffect(() => {
    const update = (e) => {
      handleMovement(e.key);
    };
    window.addEventListener("keydown", update);
    return () => {
      window.removeEventListener("keydown", update);
    };
  });
  const draw = (ctx, frameCount) => {
    ctx.lineWidth = 10;
    ctx.strokeStyle = "blue";
    ctx.lineCap = "round";
    pathP1.moveTo(prevX, prevY);
    pathP1.lineTo(x, y);
    ctx.stroke(pathP1);
  };

  const handleMovement = (dir) => {
    switch (dir) {
      case "ArrowRight":
        prevX = x;
        prevY = y;
        x += 10;
        break;
      case "ArrowLeft":
        prevX = x;
        prevY = y;
        x -= 10;
        break;
      case "ArrowUp":
        prevX = x;
        prevY = y;
        y -= 10;
        break;
      case "ArrowDown":
        prevX = x;
        prevY = y;
        y += 10;
        break;
    }
  };

  return <Canvas draw={draw} />;
}

export default App;
