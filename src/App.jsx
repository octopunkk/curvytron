import React from "react";
import Canvas from "./Canvas";
import { Header } from "./Header";
import { EndScreen } from "./EndScreen";
import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Countdown } from "./Countdown";
import { TournamentBar } from "./TournamentBar";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [tournament, setTournament] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [rmArrow, setRmArrow] = useState(false);
  const [cleanBoard, setCleanBoard] = useState(false);
  const [countdown, setCountdown] = useState(null);

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
        color: colors.green1,
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
        color: colors.yellow1,
        hasLost: false,
      },
    ],
    winner: "",
    colorWinner: "",
    runtime: 0,
  });
  let state = stateRef.current;

  let drawArrow = (ctx, player, color) => {
    let fromx = player.x + 10 * Math.cos(player.a);
    let tox = player.x + 40 * Math.cos(player.a);
    let fromy = player.y + 10 * Math.sin(player.a);
    let toy = player.y + 40 * Math.sin(player.a);
    let arrowWidth = 3;
    var headlen = 10;
    if (color == "rgb(15, 15, 15)") {
      arrowWidth = 7;
      headlen = 15;
    }

    var angle = Math.atan2(toy - fromy, tox - fromx);

    ctx.save();
    ctx.strokeStyle = color;

    //starting path of the arrow from the start square to the end square
    //and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = arrowWidth;
    ctx.stroke();

    //starting a new path from the head of the arrow to one of the sides of
    //the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 7),
      toy - headlen * Math.sin(angle - Math.PI / 7)
    );

    //path from the side point of the arrow, to the other side point
    ctx.lineTo(
      tox - headlen * Math.cos(angle + Math.PI / 7),
      toy - headlen * Math.sin(angle + Math.PI / 7)
    );

    //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 7),
      toy - headlen * Math.sin(angle - Math.PI / 7)
    );

    //draws the paths created above
    ctx.stroke();
    ctx.restore();

    setRmArrow(false);
  };
  let cleaning = (ctx) => {
    ctx.clearRect(0, 0, 500, 500);
    setCleanBoard(false);
  };

  let pickRandomStart = () => {
    setCleanBoard(true);
    state.players.forEach((player, index) => {
      player.x = Math.random() * 300 + 100;
      player.prevX = player.x;
      player.y = Math.random() * 300 + 100;
      player.prevY = player.y;
      player.a = Math.random() * 6.28;
      while (
        state.players.some((player2, index2) => {
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
    setArrow(true);
  };
  useEffect(() => pickRandomStart(), []);

  useEffect(() => {
    const keydown = (e) => {
      state.players.forEach((player) => {
        if (e.key == player.rightKey && state.runtime > 30) {
          player.movingRight = true;
        }
        if (e.key == player.leftKey && state.runtime > 30) {
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
    }
  };
  let stopGame = () => {
    setGameOver(true);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  let hasLost = (ctx, player) => {
    return state.players.some((player2, index) => {
      if (
        ctx.isPointInStroke(player2.path, player.x, player.y) ||
        player.x <= 0 ||
        player.x >= 500 ||
        player.y <= 0 ||
        player.y >= 500 ||
        (player2.pathBuffer[5]
          ? ctx.isPointInStroke(player2.pathBuffer[5], player.x, player.y) &&
            index !== player.id
          : false)
      ) {
        if (state.runtime > 45) {
          player.hasLost = true;
          return true;
        }
      }
      return false;
    });
  };

  const draw = (ctx, frameCount) => {
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    state.players.forEach((player) => {
      if (arrow) {
        drawArrow(ctx, player, player.color);
      }
      if (rmArrow) {
        drawArrow(ctx, player, "rgb(15, 15, 15)");
      }
      if (cleanBoard) {
        cleaning(ctx);
      }
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
        stopGame();
      }
    });
  };

  const move = () => {
    state.runtime += 1;
    if (state.runtime > 0 && state.runtime < 10) {
      setCountdown(3);
    }
    if (state.runtime > 10 && state.runtime < 20) {
      setCountdown(2);
    }
    if (state.runtime > 20 && state.runtime < 30) {
      setCountdown(1);
    }

    if (state.runtime > 30) {
      setArrow(false);
      setRmArrow(true);
      setCountdown(null);

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
    }
    if (state.runtime > 31) {
      setRmArrow(false);
    }
  };

  let pickColors = (playerId, color) => {
    state.players.forEach((player) => {
      if (player.id == playerId) {
        player.color = color;
      }
    });
  };
  let initNewGame = () => {
    setGameOver(false);
    state.players.forEach((player) => {
      player.movingLeft = false;
      player.movingRight = false;
      player.path = new Path2D();
      player.pathBuffer = [];
      player.hasLost = false;
    });
    state.runtime = 0;
    state.winner = "";
    state.colorWinner = "";
    pickRandomStart();
    onStart();
  };
  return (
    <div className="App">
      <Header
        onStart={onStart}
        pickColors={pickColors}
        colors={colors}
        state={state}
        tournament={tournament}
        setTournament={setTournament}
      />
      <TournamentBar tournament={tournament} />
      <Countdown num={countdown} />
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
