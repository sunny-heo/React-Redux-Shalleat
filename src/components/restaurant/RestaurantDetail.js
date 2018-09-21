import React from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers, isClassComponent } from "recompose";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";

import { setItemOpen } from "../../actions/restaurantAction";
const mapStateToProps = (state, nextOwnProps) => state.restaurants;

// const openDetail = ({ openedItem, index: currentIndex, dispatch }) => {
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
    //   openDetail(props);
    // }
  })
);
const RestaurantDetail = enhance(props => {
  const { openDetail } = props;
  return (
    <Collapse in={openDetail} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className="">
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText inset primary="Starred" />
        </ListItem>
      </List>
    </Collapse>
  );
});

export default RestaurantDetail;
