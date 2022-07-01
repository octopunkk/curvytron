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
import GitHubIcon from "@mui/icons-material/GitHub";

export let Header = (props) => {
  const [open, setOpen] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [openTournament, setOpenTournament] = useState(false);
  const [colorsPicked, setColorsPicked] = useState(
    props.state.players.map((player) => player.color)
  );

  let updateTournament = (e) => {
    props.setTournament((prev) => {
      let tnm = { ...prev };
      tnm.isOn = true;
      tnm.numOfRounds = e.target.elements["numOfRounds"]?.value;
      return tnm;
    });
  };

  let openDialog = () => setOpen(true);
  let openTournamentDialog = () => setOpenTournament(true);
  let openHelpDialog = () => setOpenHelp(true);

  let handleClose = () => {
    setOpen(false);
    setOpenTournament(false);
    setOpenHelp(false);
  };
  let handleClick = (playerId, color) => (e) => {
    setColorsPicked((prev) => {
      let new1 = [...prev];
      new1[playerId] = color;
      return new1;
    });
    props.pickColors(playerId, color);
  };
  const handleGitClick = () => {
    window.open("https://github.com/octopunkk/curvytron");
  };
  return (
    <div className="header">
      <div className="title">
        <GitHubIcon
          className="ghIcon"
          fontSize="large"
          sx={{ cursor: "pointer" }}
          onClick={handleGitClick}
        />

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
          {props.tournament.isOn ? "Edit Tournament" : "Create Tournament"}
        </Button>
        <Button
          variant="contained"
          onClick={openHelpDialog}
          sx={{
            backgroundColor: props.colors.red1,
            ":hover": { backgroundColor: props.colors.darkred1 },
          }}
        >
          Help
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
        <Dialog open={openHelp} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">{"How to play ?"}</DialogTitle>
          <DialogContent>
            <h3>Rules</h3>
            <p>Survive longer than your opponent !</p>
            <p>You can only turn left or right, and you're always moving.</p>
            <p>
              Don't hit your line, your opponent's line or the borders of the
              game, or you're dead !
            </p>
            <h3>Commands</h3>
            <p>Player 1 : LEFT and RIGHT arrow keys</p>
            <p>Player 2 : A and D keys</p>
            <h3>Encounter a bug ?</h3>
            <p>Tell me ! </p>
            <p>Either on github (logo on the top left corner) </p>
            <p>or per mail : hello@anaisderue.com </p>
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
              Got it !
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
