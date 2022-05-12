import React from "react";
import Button from "@mui/material/Button";

export let Header = (props) => {
  return (
    <div className="header">
      <div className="title">
        <h1>Curvytron !!!</h1>
      </div>

      <div className="buttons">
        <Button variant="contained" onClick={props.onStart}>
          Start Game
        </Button>
        <Button variant="contained" onClick={props.initPlayer2}>
          Add player 2
        </Button>
      </div>
    </div>
  );
};
