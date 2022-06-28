import React, { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";

export let TournamentBar = (props) => {
  let numOfRounds = props.tournament.numOfRounds;
  let p1Win = 1;
  let p2Win = 7;
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
      {tnm.map((result, index) =>
        result ? (
          <CircleIcon
            fontSize="large"
            sx={{ color: "red" }}
            key={index}
          ></CircleIcon>
        ) : (
          <CircleTwoToneIcon
            fontSize="large"
            sx={{ color: "BurlyWood" }}
            key={index}
          ></CircleTwoToneIcon>
        )
      )}
    </div>
  );
};
