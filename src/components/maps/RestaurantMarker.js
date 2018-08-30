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
    borderRadius: "2px",
    transform: "translate(-50%, -50%)",
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
  const {
    lat,
    lng,
    index,
    handleRestaurantClick,
    restaurant,
    classes
    // openedItem
  } = props;

  const { _in = true, opening_hours: hours = {} } = restaurant;
  const { open_now: openNow = false } = hours;
  const location = { lat, lng };
  // const { openedIndex, opened } = openedItem;
  // const openDetail = openedIndex === index && opened;
  return (
    <Grow
      in={_in}
      mountOnEnter
      unmountOnExit
      {...{
        timeout: {
          enter: index * 50,
          exit: index * 20
        }
      }}
    >
      <IconButton
        className={classes.markerIcon}
        style={
          openNow
            ? { backgroundColor: "#39e4a9" }
            : { backgroundColor: "#424242" }
        }
        onClick={handleRestaurantClick(index, location)}
      >
        <RestaurantIcon style={{ color: "#fff", borderRadius: "2px" }} />
      </IconButton>
    </Grow>
  );
});

export default RestaurantMarker;
