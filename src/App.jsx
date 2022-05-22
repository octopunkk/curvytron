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
    players: [
      {
        id: 0,
        leftKey: "ArrowLeft",
        rightKey: "ArrowRight",
        movingLeft: false,
        movingRight: false,
        path: new Path2D(),
        pathBuffer: [],
        color: colors.purple,
        lostCount: 0,
        hasLost: false,
      },
      {
        id: 1,
        leftKey: "a",
        rightKey: "d",
        movingLeft: false,
        movingRight: false,
        path: new Path2D(),
        pathBuffer: [],
        color: colors.green,
        lostCount: 0,
        hasLost: false,
      },
    ],
    winner: "",
    colorWinner: "",
  });
  let state = stateRef.current;

  let pickRandomStart = () => {
    state.players.forEach((player, index) => {
      player.x = Math.random() * 300 + 100;
      player.prevX = player.x;
      player.y = Math.random() * 300 + 100;
      player.prevY = player.y;
      player.a = Math.random() * 6.28;
      while (
        state.players.forEach((player2, index2) => {
          if (index2 < index) {
            if (
              Math.abs(player.x - player2.x) < 50 ||
              Math.abs(player.y - player2.y) < 50
            ) {
              return true;
            }
          }
          return false;
        })
      ) {
        player.x = Math.random() * 300 + 100;
        player.prevX = player.x;
        player.y = Math.random() * 300 + 100;
        player.prevY = player.y;
      }
    });
  };
  useEffect(() => pickRandomStart(), []);

  useEffect(() => {
    const keydown = (e) => {
      state.players.forEach((player) => {
        if (e.key == player.rightKey) {
          player.movingRight = true;
        }
        if (e.key == player.leftKey) {
          player.movingLeft = true;
        }
      });
    };
    const keyup = (e) => {
      state.players.forEach((player) => {
        if (e.key == player.rightKey) {
          player.movingRight = false;
        }
        if (e.key == player.leftKey) {
          player.movingLeft = false;
        }
      });
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
      setArrow(false);
    }
  };
  let stopGame = () => {
    setGameOver(true);
    clearInterval(intervalRef.current);
  };
  let hasLost = (ctx, player) => {
    return state.players.some((player2) => {
      if (
        ctx.isPointInStroke(player2.path, player.x, player.y) ||
        player.x <= 0 ||
        player.x >= 500 ||
        player.y <= 0 ||
        player.y >= 500
      ) {
        if (intervalRef.current) {
          player.lostCount += 1;
          if (player.lostCount > 14) {
            player.hasLost = true;
            return true;
          }
        }
      }
      return false;
    });
  };

  const draw = (ctx, frameCount) => {
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    state.players.forEach((player) => {
      let newPath = new Path2D();
      newPath.moveTo(player.prevX, player.prevY);
      newPath.lineTo(player.x, player.y);
      ctx.strokeStyle = player.color;
      ctx.stroke(newPath);
      player.pathBuffer.push(newPath);
      if (player.pathBuffer.length >= 10) {
        player.path.addPath(player.pathBuffer.shift());
      }
      if (hasLost(ctx, player)) {
        // TODO : update to handle more players
        if (player.id == 0) {
          state.winner = "Player 2";
          state.colorWinner = state.players[1].color;
        } else {
          state.winner = "Player 1";
          state.colorWinner = state.players[0].color;
        }
        console.log("heyyyy");
        stopGame();
      }
    });
  };

  const move = () => {
    state.players.forEach((player) => {
      player.prevX = player.x;
      player.prevY = player.y;
      if (player.movingLeft) {
        player.a -= 0.2;
      }
      if (player.movingRight) {
        player.a += 0.2;
      }
      player.x += 4 * Math.cos(player.a);
      player.y += 4 * Math.sin(player.a);
    });
  };

  let pickColors = (color, player) => {
    player.color = color;
  };
  let initNewGame = () => {
    state.players.forEach((player) => {
      player.movingLeft = false;
      player.movingRight = false;
      player.path = new Path2D();
      player.pathBuffer = [];
      player.lostCount = 0;
    });

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
          initNewGame={initNewGame}
        />
      )}
    </div>
  );
}

export default App;
