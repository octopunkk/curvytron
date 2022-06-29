import React, { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";

export let TournamentBar = (props) => {
  let numOfRounds = props.tournament.numOfRounds;
  let p1Win = 1;
  let p2Win = 1;
  let tnm = [];
  for (let i = 0; i < numOfRounds; i++) {
    tnm[i] = 0;
    if (i < p1Win) {
      tnm[i] = 1;
    }
    if (p2Win >= numOfRounds - i) {
      tnm[i] = 2;
    }
  }
  let middle = Math.floor(numOfRounds / 2);

  if (tnm[middle]) {
    console.log("tournament won by " + tnm[middle]);
  }
  return (
    <div className="tournamentBar">
      {tnm.map((result, index) => {
        let size = 40;
        if (index == middle) {
          size = 60;
        }
        if (result == "1") {
          return (
            <CircleIcon
              sx={{ color: props.state.players[0].color, fontSize: size }}
              key={index}
            ></CircleIcon>
          );
        } else if (result == "2") {
          return (
            <CircleIcon
              sx={{ color: props.state.players[1].color, fontSize: size }}
              key={index}
            ></CircleIcon>
          );
        } else if (result == "0") {
          return (
            <CircleTwoToneIcon
              sx={{
                color: "BurlyWood",
                fontSize: size,
              }}
              key={index}
            ></CircleTwoToneIcon>
          );
        }
      })}
    </div>
  );
};
