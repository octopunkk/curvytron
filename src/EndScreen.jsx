import React from "react";
import Button from "@mui/material/Button";

export let EndScreen = (props) => {
  const [open, setOpen] = React.useState(props.gameOver);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    props.initNewGame();
    if (props.tournament.isOver) {
      props.resetTournament();
    }
    setOpen(false);
  };
  let message;
  if (props.tournament.isOver) {
    message = `Player ${props.tournament.winner} won the tournament !`;
  } else {
    message = `${props.winner} won this round !`;
  }
  let buttonMessage;

  if (props.tournament.isOver) {
    buttonMessage = `Restart tournament`;
  } else {
    buttonMessage = `Start new round`;
  }
  return (
    open && (
      <div
        className="endScreen"
        style={{ backgroundColor: `${props.colorWinner}80` }}
      >
        <span style={{ fontFamily: "Lobster" }} className="outline">
          {message}
        </span>
        <br />
        <br />
        <Button onClick={handleClick} sx={{ color: "black" }}>
          <p className="outline" style={{ fontWeight: "bold" }}>
            {buttonMessage}
          </p>
        </Button>
      </div>
    )
  );
};
