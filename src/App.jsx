import React from "react";
import Canvas from "./Canvas";
import { Header } from "./Header";
import { EndScreen } from "./EndScreen";
import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const colors = {
    green1: "#2a9d8f",
    yellow1: "#e9c46a",
    orange1: "#f4a261",
    red1: "#e76f51",
    darkred1: "#a14d38",
    purple: "#9B5DE5",
    pink: "#F15BB5",
    yellow: "#FEE440",
    blue: "#00BBF9",
    green: "#00F5D4",
  };
  let stateRef = useRef({
    movingLeft: false,
    movingRight: false,
    pathP1: new Path2D(),
    pathP2: new Path2D(),
    pathBuffer: [],
    colorP1: colors.purple,
    lostCount: 0,
    movingLeft2: false,
    movingRight2: false,
    pathBuffer2: [],
    colorP2: colors.green,
    lostCount2: 0,
    winner: "",
    colorWinner: "",
  });
  let state = stateRef.current;

  let pickRandomStart = () => {
    state.x = Math.random() * 300 + 100;
    state.prevX = state.x;
    state.y = Math.random() * 300 + 100;
    state.prevY = state.y;
    state.x2 = Math.random() * 300 + 100;
    state.prevX2 = state.x2;
    state.y2 = Math.random() * 300 + 100;
    state.prevY2 = state.y2;
    state.a = Math.random() * 6.28;
    state.a2 = Math.random() * 6.28;
  };
  useEffect(() => pickRandomStart(), []);

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
  let stopGame = () => {
    setGameOver(true);
    clearInterval(intervalRef.current);
  };

  const draw = (ctx, frameCount) => {
    ctx.lineWidth = 10;
    let newPath = new Path2D();
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
          state.winner = "Player 1";
          state.colorWinner = state.colorP1;
          stopGame();
        }
      }
    }
    if (ctx.isPointInStroke(state.pathP1, state.x2, state.y2)) {
      if (intervalRef.current) {
        state.lostCount2 += 1;
        if (state.lostCount2 > 8) {
          state.winner = "Player 1";
          state.colorWinner = state.colorP1;
          stopGame();
        }
      }
    }
    if (state.x <= 0 || state.x >= 500 || state.y <= 0 || state.y >= 500) {
      state.winner = "Player 2";
      state.colorWinner = state.colorP2;
      stopGame();
    }
    if (state.x2 <= 0 || state.x2 >= 500 || state.y2 <= 0 || state.y2 >= 500) {
      state.winner = "Player 1";
      state.colorWinner = state.colorP1;
      stopGame();
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
          state.winner = "Player 2";
          state.colorWinner = state.colorP2;
          stopGame();
        }
      }
    }
    if (ctx.isPointInStroke(state.pathP1, state.x, state.y)) {
      if (intervalRef.current) {
        state.lostCount += 1;
        if (state.lostCount > 8) {
          state.winner = "Player 2";
          state.colorWinner = state.colorP2;

          stopGame();
        }
      }
    }
  };

  const move = () => {
    console.log(state.a);
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
  };
  let pickColors = (color, player) => {
    if (player == "P1") {
      state.colorP1 = color;
    }
    if (player == "P2") {
      state.colorP2 = color;
    }
  };
  let initNewGame = () => {
    state.movingLeft = false;
    state.movingRight = false;
    state.pathP1 = new Path2D();
    state.pathP2 = new Path2D();
    state.pathBuffer = [];
    state.lostCount = 0;
    state.movingLeft2 = false;
    state.movingRight2 = false;
    state.pathBuffer2 = [];
    state.lostCount2 = 0;
    state.winner = "";
    state.colorWinner = "";
    pickRandomStart();
    const id = setInterval(move, 50);
    intervalRef.current = id;
  };

  return (
    <div className="App">
      <Header
        onStart={onStart}
        pickColors={pickColors}
        colors={colors}
        state={state}
      />
      <Canvas draw={draw} />
      {gameOver && (
        <EndScreen
          gameOver={gameOver}
          winner={state.winner}
          colorWinner={state.colorWinner}
        />
      )}
    </div>
  );
}

export default App;
