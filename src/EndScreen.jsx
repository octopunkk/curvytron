import React from "react";

export let EndScreen = (props) => {
  const [open, setOpen] = React.useState(props.gameOver);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
      className="endScreen"
      style={{ backgroundColor: `${props.colorWinner}80` }}
    >
      {props.winner} won this round !
    </div>
  );
};
