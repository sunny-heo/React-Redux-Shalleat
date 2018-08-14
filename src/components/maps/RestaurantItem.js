import React, { Fragment } from "react";
import { compose } from "recompose";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import RestaurantOutlined from "@material-ui/icons/RestaurantOutlined";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Avatar from "@material-ui/core/Avatar";
import StarRating from "./StarRating";
import Divider from "@material-ui/core/Divider";
import Slide from "@material-ui/core/Slide";

import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";

const enhance = compose();
const RestaurantItem = enhance(props => {
  const { restaurant, handleItemClick, open, index } = props;
  return (
    <Fragment>
      <Divider />
      <Slide
        in={true}
        direction="left"
        in={true}
        mountOnEnter
        unmountOnExit
        // style={{ transformOrigin: "0 0 0" }}
        {...(true ? { timeout: index * 300 - 1.75 ** index } : {})}
      >
        {/* <Paper elevation={4} className=""> */}
        <div>
          <ListItem
            button
            onClick={handleItemClick}
            // className="shadow-sm rounded"
            style={{ borderLeft: "5px solid #39e4a9", marginTop: "0rem" }}
          >
            <ListItemIcon>
              {/* {restaurant.rating ? (
            <StarRating rating={restaurant.rating} />
          ) : (
            <div>hello</div>
          )} */}
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
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className="">
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
          {/* </Paper> */}
        </div>
      </Slide>
    </Fragment>
  );
});

export default RestaurantItem;
