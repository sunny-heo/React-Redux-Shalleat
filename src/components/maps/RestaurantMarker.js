import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers, isClassComponent } from "recompose";
import { setItemOpen } from "../../actions/restaurantAction";

import IconButton from "@material-ui/core/IconButton";
import RestaurantIcon from "@material-ui/icons/Restaurant";

const mapStateToProps = (state, nextOwnProps) => state.restaurants;

const openItem = ({ openedItem, index: currentIndex, dispatch }) => {
  const { openedIndex, opened } = openedItem;
  if (opened && openedIndex !== currentIndex) {
    dispatch(setItemOpen(currentIndex, opened));
  } else {
    dispatch(setItemOpen(currentIndex, !opened));
  }
};

const enhance = compose(
  connect(mapStateToProps),
  withHandlers({
    handleItemClick: props => evt => {
      evt.preventDefault();
      openItem(props);
    }
  })
);
const RestaurantMarker = enhance(props => {
  //  const { restaurant, handleItemClick, index, openedItem } = props;
  // const { openedIndex, opened } = openedItem;
  // const { opening_hours: hours = {} } = restaurant;
  // const { open_now: openNow = false } = hours;
  // const openDetail = openedIndex === index && opened;
  //onClick={centeredMyLocation}
  return (
    <IconButton>
      <RestaurantIcon style={{ color: "#212121" }} />
    </IconButton>
  );
});

export default RestaurantMarker;
