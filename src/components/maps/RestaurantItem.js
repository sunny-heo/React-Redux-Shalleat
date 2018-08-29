import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers, isClassComponent } from "recompose";

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

import { setItemOpen } from "../../actions/restaurantAction";
const mapStateToProps = (state, nextOwnProps) => state.restaurants;

// const openItem = ({ openedItem, index: currentIndex, dispatch }) => {
//   const { openedIndex, opened } = openedItem;
//   if (opened && openedIndex !== currentIndex) {
//     dispatch(setItemOpen(currentIndex, opened));
//   } else {
//     dispatch(setItemOpen(currentIndex, !opened));
//   }
// };

const enhance = compose(
  connect(mapStateToProps),
  withHandlers({
    // handleItemClick: props => evt => {
    //   evt.preventDefault();
    //   openItem(props);
    // }
  })
);
const RestaurantItem = enhance(props => {
  const {
    restaurant,
    handleItemClick,
    index,
    openedItem,
    handleRestaurantClick
  } = props;
  const { openedIndex, opened } = openedItem;
  const { opening_hours: hours = {}, geometry } = restaurant;
  const { open_now: openNow = false } = hours;
  const openDetail = openedIndex === index && opened;
  return (
    <Fragment>
      <Slide
        in={true}
        direction="left"
        mountOnEnter
        unmountOnExit
        {...(true ? { timeout: index * 300 - 1.75 ** index } : {})}
      >
        <div style={{ paddingRight: "2px" }}>
          <ListItem
            button
            onClick={handleRestaurantClick(index, geometry.location)}
            className={openDetail ? "shadow-sm rounded mt-2" : "mt-2"}
            style={
              openNow
                ? { borderLeft: "5px solid #39e4a9" }
                : { borderLeft: "5px solid #424242" }
            }
          >
            <ListItemIcon>
              <img
                src={restaurant.icon}
                style={{ width: "40px", height: "40px" }}
              />
            </ListItemIcon>
            <ListItemText
              inset
              primary={restaurant.name}
              secondary={restaurant.vicinity}
            />
            {openDetail ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openDetail} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className="">
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
        </div>
      </Slide>
    </Fragment>
  );
});

export default RestaurantItem;
