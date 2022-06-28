import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircleIcon from "@mui/icons-material/Circle";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

export let Header = (props) => {
  const [open, setOpen] = useState(false);
  const [openTournament, setOpenTournament] = useState(false);
  const [colorsPicked, setColorsPicked] = useState(
    props.state.players.map((player) => player.color)
  );

  let openDialog = () => setOpen(true);
  let openTournamentDialog = () => setOpenTournament(true);

  let handleClose = () => {
    setOpen(false);
    setOpenTournament(false);
  };
  let handleClick = (playerId, color) => (e) => {
    setColorsPicked((prev) => {
      let new1 = [...prev];
      new1[playerId] = color;
      return new1;
    });
    props.pickColors(playerId, color);
  };
  let handleChange = (e) => {};

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
        <Button
          variant="contained"
          onClick={openTournamentDialog}
          sx={{
            backgroundColor: props.colors.red1,
            ":hover": { backgroundColor: props.colors.darkred1 },
          }}
        >
          {props.tournament ? "Edit Tournament" : "Create Tournament"}
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">{"Select colors"}</DialogTitle>
          <DialogContent>
            {props.state.players.map((player) => (
              <div>
                Player {player.id + 1} :
                <br />
                <br />
                {Object.values(props.colors).map((color, index) =>
                  color == colorsPicked[player.id] ? (
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
                      onClick={handleClick(player.id, color)}
                    ></CircleIcon>
                  )
                )}
                <br />
                <br />
              </div>
            ))}
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
        <Dialog open={openTournament} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">{"Edit Tournament"}</DialogTitle>
          <DialogContent>
            Number of rounds
            <br />
            <br />
            <ButtonGroup variant="text" aria-label="text button group">
              <Button>4</Button>
              <Button>8</Button>
              <Button>16</Button>
            </ButtonGroup>
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
