import React from "react";
// import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

// const styles = theme => ({
//   progress: {
//     margin: theme.spacing.unit * 2
//   }
// });

const CircularPending = ({ style = {}, size, thickness = 3 }) => {
  return (
    <div>
      <CircularProgress style={style} size={size} thickness={thickness} />
    </div>
  );
};

export default CircularPending;
