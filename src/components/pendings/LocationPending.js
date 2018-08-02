import React from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = {
  LocationPending: {
    flexGrow: 1
  }
};

const enhance = compose(withStyles(styles));

const LocationPending = enhance(props => {
  const { classes } = props;
  return (
    <div className={classes.LocationPending}>
      <LinearProgress color="secondary" />
    </div>
  );
});

export default LocationPending;
