import React from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers, lifecycle } from "recompose";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";

import { getRestaurantDetails } from "../../actions/restaurantAction";

const mapStateToProps = (state, nextOwnProps) => state.restaurants;
const mapDispatchToProps = dispatch => {
  return {
    getDetails: async placeId => {
      try {
        await dispatch(getRestaurantDetails(placeId));
      } catch (error) {
        console.log(error);
      }
    }
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    async componentDidMount() {
      const { getDetails, restaurant } = this.props;
      console.log("getRestaurantDetails");
      console.log("getRestaurantDetails");
      console.log("getRestaurantDetails");
      console.log("getRestaurantDetails");
      console.log("getRestaurantDetails");
      console.log("getRestaurantDetails");
      await getDetails(restaurant.place_id);
    }
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
