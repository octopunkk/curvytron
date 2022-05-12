import React from "react";
import useCanvas from "./useCanvas";

const Canvas = (props) => {
  const { draw } = props;
  const canvasRef = useCanvas(draw);

  return (
    <div className="canvasFrame">
      <canvas ref={canvasRef} height={500} width={500} />
    </div>
  );
};

export default Canvas;
