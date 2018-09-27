import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const CircularPending = ({ style = {}, size, thickness = 3 }) => {
  return <CircularProgress style={style} size={size} thickness={thickness} />;
};

export default CircularPending;
