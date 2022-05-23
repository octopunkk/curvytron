import React from "react";

export let Countdown = (props) => {
  let size;
  if (props.num == 3) {
    size = 50;
  }
  if (props.num == 2) {
    size = 70;
  }
  if (props.num == 1) {
    size = 90;
  }
  return (
    <div className="countdown" style={{ fontSize: `${size}px ` }}>
      {props.num}
    </div>
  );
};
