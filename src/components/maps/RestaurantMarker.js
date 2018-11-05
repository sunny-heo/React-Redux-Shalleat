import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import Grow from "@material-ui/core/Grow";

const mapStateToProps = (state, nextOwnProps) => state.restaurants;

const styles = theme => ({
  markerIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "2px",
    transform: "translate(-50%, -70%)",
    boxShadow:
      "0 0 4px 0 rgba(0, 0, 0, 0.14), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)"
  }
});

const enhance = compose(
  connect(mapStateToProps),
  withStyles(styles),
  withHandlers({})
);
const RestaurantMarker = enhance(props => {
  const { index, classes, restaurant, handleRestaurantClick } = props;
  const {
    _in = true,
    opening_hours: hours = {},
    place_id,
    geometry
  } = restaurant;
  const { open_now: openNow = false } = hours;
  const { location } = geometry;

  return (
    <Grow
      in={_in}
      mountOnEnter
      unmountOnExit
      {...{
        timeout: {
          enter: index * 80,
          exit: index * 50
        }
      }}
    >
      <IconButton
        className={`${classes.markerIcon} shadow-sm rounded ${
          openNow ? "markerButtonOn" : "markerButtonOff"
        }`}
        style={
          openNow
            ? { backgroundColor: "#39e4a9" }
            : { backgroundColor: "#424242" }
        }
        onClick={handleRestaurantClick(place_id, location)}
      >
        <RestaurantIcon style={{ color: "#fff", borderRadius: "2px" }} />
      </IconButton>
    </Grow>
  );
});

export default RestaurantMarker;
