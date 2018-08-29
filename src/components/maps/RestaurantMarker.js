import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers, isClassComponent } from "recompose";

import IconButton from "@material-ui/core/IconButton";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import Tooltip from "@material-ui/core/Tooltip";

const mapStateToProps = (state, nextOwnProps) => state.restaurants;

const enhance = compose(
  connect(mapStateToProps),
  withHandlers({
    // handleItemClick: props => evt => {
    //   evt.preventDefault();
    //   openItem(props);
    // }
  })
);
const RestaurantMarker = enhance(props => {
  const { lat, lng, index, handleRestaurantClick, restaurant } = props;

  const { opening_hours: hours = {} } = restaurant;
  const { open_now: openNow = false } = hours;

  // const { openedIndex, opened } = openedItem;
  // const openDetail = openedIndex === index && opened;
  return (
    <Tooltip disableHoverListener title="Add">
      <IconButton
        // className={openDetail ? "shadow-sm rounded mt-2" : "mt-2"}
        style={
          openNow
            ? { backgroundColor: "#39e4a9" }
            : { backgroundColor: "#424242" }
        }
        onClick={handleRestaurantClick(index, { lat, lng })}
      >
        <RestaurantIcon style={{ color: "#fff" }} />
      </IconButton>
    </Tooltip>
  );
});

export default RestaurantMarker;
