import React from "react";
// import Loader from "react-loader-spinner";
import CircularProgress from "@material-ui/core/CircularProgress";
const CircularPending = ({ style }) => (
  <CircularProgress
    style={{ width: "50px", height: "50px", color: "#ff4081", ...style }}
  />
);

export default CircularPending;
