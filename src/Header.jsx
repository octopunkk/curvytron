import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircleIcon from "@mui/icons-material/Circle";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";

export let Header = (props) => {
  const [open, setOpen] = useState(false);
  const [colorPicked, setColorPicked] = useState(props.state.colorP1);
  const [colorPicked2, setColorPicked2] = useState(props.state.colorP2);

  let openDialog = () => setOpen(true);
  let handleClose = () => setOpen(false);
  let handleClick = (e) => {
    setColorPicked(e.currentTarget.dataset.tag);
    props.pickColors(e.currentTarget.dataset.tag, "P1");
  };
  let handleClick2 = (e) => {
    setColorPicked2(e.currentTarget.dataset.tag);
    props.pickColors(e.currentTarget.dataset.tag, "P2");
  };
  return (
    <div className="header">
      <div className="title">
        <h1>Curvytron</h1>
      </div>
      <br />

      <div className="buttons">
        <Button
          variant="contained"
          onClick={props.onStart}
          sx={{
            backgroundColor: props.colors.red1,
            ":hover": { backgroundColor: props.colors.darkred1 },
          }}
        >
          Start Game
        </Button>

        <Button
          variant="contained"
          onClick={openDialog}
          sx={{
            backgroundColor: props.colors.red1,
            ":hover": { backgroundColor: props.colors.darkred1 },
          }}
        >
          Pick colors
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">{"Select colors"}</DialogTitle>
          <DialogContent>
            Player 1 :
            <br />
            <br />
            {Object.values(props.colors).map((color, index) =>
              color == colorPicked ? (
                <CircleTwoToneIcon
                  fontSize="large"
                  sx={{ color: color, cursor: "pointer" }}
                  key={index}
                ></CircleTwoToneIcon>
              ) : (
                <CircleIcon
                  fontSize="large"
                  sx={{ color: color, cursor: "pointer" }}
                  key={index}
                  onClick={handleClick}
                  data-tag={color}
                ></CircleIcon>
              )
            )}
            <br />
            <br />
            Player 2 :
            <br />
            <br />
            {Object.values(props.colors).map((color, index) =>
              color == colorPicked2 ? (
                <CircleTwoToneIcon
                  fontSize="large"
                  sx={{ color: color, cursor: "pointer" }}
                  key={index}
                ></CircleTwoToneIcon>
              ) : (
                <CircleIcon
                  fontSize="large"
                  sx={{ color: color, cursor: "pointer" }}
                  key={index}
                  onClick={handleClick2}
                  data-tag={color}
                ></CircleIcon>
              )
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              autoFocus
              sx={{
                color: props.colors.red1,
                ":hover": {
                  color: props.colors.darkred1,
                  backgroundColor: "rgba(0, 0, 0, 0)",
                },
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
