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
    setOpen(false);
  };
  return (
    open && (
      <div
        className="endScreen"
        style={{ backgroundColor: `${props.colorWinner}80` }}
      >
        <span style={{ fontFamily: "Lobster" }} className="outline">
          {props.winner} won this round !
        </span>
        <br />
        <br />
        <Button onClick={handleClick} sx={{ color: "black" }}>
          <p className="outline" style={{ fontWeight: "bold" }}>
            Start new round
          </p>
        </Button>
      </div>
    )
  );
};
