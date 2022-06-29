import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircleIcon from "@mui/icons-material/Circle";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";

export let Header = (props) => {
  const [open, setOpen] = useState(false);
  const [openTournament, setOpenTournament] = useState(false);
  const [colorsPicked, setColorsPicked] = useState(
    props.state.players.map((player) => player.color)
  );

  let updateTournament = (e) => {
    props.setTournament((prev) => {
      let tnm = { ...prev };
      tnm.tnmIsOn = true;
      tnm.numOfRounds = e.target.elements["numOfRounds"]?.value;
      return tnm;
    });
  };

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
          {props.tournament.tnmIsOn ? "Edit Tournament" : "Create Tournament"}
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateTournament(e);
                handleClose();
              }}
            >
              <FormControl>
                <FormLabel id="roundsNumber">Number of rounds</FormLabel>
                <RadioGroup row name="numOfRounds">
                  <FormControlLabel
                    value="5"
                    control={
                      <Radio
                        sx={{
                          color: props.colors.red1,
                          "&.Mui-checked": {
                            color: props.colors.red1,
                          },
                        }}
                      />
                    }
                    label="5"
                  />
                  <FormControlLabel
                    value="9"
                    control={
                      <Radio
                        sx={{
                          color: props.colors.red1,
                          "&.Mui-checked": {
                            color: props.colors.red1,
                          },
                        }}
                      />
                    }
                    label="9"
                  />
                  <FormControlLabel
                    value="15"
                    control={
                      <Radio
                        sx={{
                          color: props.colors.red1,
                          "&.Mui-checked": {
                            color: props.colors.red1,
                          },
                        }}
                      />
                    }
                    label="15"
                  />
                </RadioGroup>
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
                  type="submit"
                >
                  Save
                </Button>
              </FormControl>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
