import React from "react";
import useCanvas from "./useCanvas";

const Canvas = (props) => {
  const { draw } = props;
  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} height={1000} width={1000} />;
};

export default Canvas;
