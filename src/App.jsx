import React from "react";
import Canvas from "./Canvas";
import { useEffect, useState } from "react";

function App() {
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [prevX, setPrevX] = useState();
  const [prevY, setPrevY] = useState();
  useEffect(() => {
    const update = (e) => {
      setPrevX(x);
      setPrevY(y);
      setX(e.x);
      setY(e.y);
    };
    window.addEventListener("mousemove", update);
    window.addEventListener("touchmove", update);
    return () => {
      window.removeEventListener("mousemove", update);
      window.removeEventListener("touchmove", update);
    };
  }, [setX, setY]);

  const draw = (ctx, frameCount) => {
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    const myPath = new Path2D();
    // myPath.arc(150, 75, 50, 0, 2 * Math.PI);
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill(myPath);
  };

  return <Canvas draw={draw} x={x} y={y} />;
}

export default App;
