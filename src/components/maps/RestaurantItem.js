import React, { Fragment } from "react";
import { compose } from "recompose";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Divider from "@material-ui/core/Divider";
import Slide from "@material-ui/core/Slide";

const enhance = compose();
const RestaurantItem = enhance(props => {
  const { restaurant, handleItemClick, open, index } = props;
  const { opening_hours: hours = {} } = restaurant;
  const { open_now: openNow = false } = hours;
  return (
    <Fragment>
      <Slide
        in={true}
        direction="left"
        mountOnEnter
        unmountOnExit
        {...(true ? { timeout: index * 300 - 1.75 ** index } : {})}
      >
        <div>
          <ListItem
            button
            onClick={handleItemClick}
            className="shadow-sm rounded mt-2"
            style={
              openNow
                ? { borderLeft: "5px solid #39e4a9", marginTop: "0rem" }
                : { borderLeft: "5px solid #424242", marginTop: "0rem" }
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
        </div>
      </Slide>
    </Fragment>
  );
});

export default RestaurantItem;
