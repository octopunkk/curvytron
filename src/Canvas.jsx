import React from "react";
import useCanvas from "./useCanvas";

const Canvas = (props) => {
  const { draw } = props;
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} height={500} width={500} />;
};

export default Canvas;
