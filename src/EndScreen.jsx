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
        {props.winner} won this round !
        <br />
        <br />
        <Button onClick={handleClick}>Start new round</Button>
      </div>
    )
  );
};
