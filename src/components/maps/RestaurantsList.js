import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import RestaurantItem from "./RestaurantItem";
import MainSearchForm from "../maps/MainSearchForm";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(connect(mapStateToProps));

const RestaurantsList = enhance(props => {
  const { list: restaurants, keyword, ...restProps } = props.restaurants;
  return (
    <div
      className="RestList list-group h-100 shadow-sm rounded"
      style={{ overflow: "scroll" }}
    >
      <List
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            className="bg-white shadow-sm"
            style={{ marginBottom: "5px" }}
          >
            {keyword || "Hello World"}
            <IconButton className="" aria-label="Delete">
              <SearchIcon />
            </IconButton>
            {/* <SearchIcon /> */}
            {/* <MainSearchForm style={{ width: "100%" }} /> */}
          </ListSubheader>
        }
      >
        {restaurants.map((r, i) => (
          <RestaurantItem
            key={r.place_id}
            index={i}
            restaurant={r}
            {...restProps}
          />
        ))}
      </List>
    </div>
  );
});

export default RestaurantsList;
