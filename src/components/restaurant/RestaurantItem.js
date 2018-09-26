import React, { Fragment } from "react";

import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Slide from "@material-ui/core/Slide";
import Divider from "@material-ui/core/Divider";
import RestaurantRating from "./RestaurantRating";
import RestaurantReview from "./RestaurantReview";

const mapStateToProps = (state, nextOwnProps) => state.restaurants;

const enhance = compose(
  connect(mapStateToProps),
  withHandlers({})
);
const RestaurantItem = enhance(props => {
  const { index, restaurant, openedItem, handleRestaurantClick } = props;
  const { openedPlaceId, opened } = openedItem;
  const {
    _in = true,
    opening_hours: hours = {},
    geometry,
    place_id
  } = restaurant;
  const { open_now: openNow = false } = hours;
  const openDetail = openedPlaceId === place_id && opened;
  return (
    <Fragment>
      <Slide
        in={_in}
        direction="left"
        unmountOnExit
        {...{
          timeout: {
            enter: index * 50,
            exit: index * 20
          }
        }}
      >
        <div style={{ paddingRight: "2px" }}>
          <ListItem
            button
            onClick={handleRestaurantClick(place_id, geometry.location)}
            className={openDetail ? "shadow-sm rounded mt-2" : "mt-2"}
            style={{
              borderLeft: openNow ? "5px solid #39e4a9" : "5px solid #424242"
            }}
          >
            <ListItemIcon>
              <img
                alt="Restaurant type icon"
                src={restaurant.icon}
                style={{ width: "40px", height: "40px" }}
              />
            </ListItemIcon>
            <ListItemText
              inset
              disableTypography={true}
              primary={
                <span style={{ display: "block", marginBottom: "3px" }}>
                  {restaurant.name}
                </span>
              }
              secondary={<RestaurantRating rating={restaurant.rating} />}
            />
            {openDetail ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <RestaurantReview restaurant={restaurant} openDetail={openDetail} />
          <Divider />
        </div>
      </Slide>
    </Fragment>
  );
});

export default RestaurantItem;
