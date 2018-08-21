import React from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers } from "recompose";

import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import RestaurantItem from "./RestaurantItem";
import TextField from "@material-ui/core/TextField";
import Grow from "@material-ui/core/Grow";
import SearchPending from "../pendings/SearchPending";

const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(
  connect(mapStateToProps),
  withState("revealSubSearch", "setRevealSubSearch", false),
  withHandlers({
    handleSearchOnClick: props => evt => {
      evt.preventDefault();
      const { revealSubSearch, setRevealSubSearch } = props;
      setRevealSubSearch(!revealSubSearch);
    }
  })
);

const RestaurantsList = enhance(
  ({
    revealSubSearch,
    handleSearchOnClick,
    handleSearchOnChange,
    restaurants,
    _restaurants
  }) => {
    const { pendingGetRestaurants: pendingRestaurants } = restaurants;
    return (
      <div className="RestList list-group h-100">
        <List
          component="nav"
          style={{ display: "flex", flexDirection: "column", padding: 0 }}
          subheader={
            <ListSubheader component="div" className="bg-white shadow-sm">
              <SearchPending
                display="inline-block"
                pending={pendingRestaurants}
                handleOnClick={handleSearchOnClick}
              />
              <Grow in={!revealSubSearch}>
                <div
                  style={
                    !revealSubSearch
                      ? { display: "inline-block", width: "75%" }
                      : { display: "none" }
                  }
                >
                  <span>{`Search: ${restaurants.keyword ||
                    "no results"}`}</span>
                </div>
              </Grow>
              <Grow in={revealSubSearch}>
                <div
                  style={
                    revealSubSearch
                      ? { display: "inline-block", width: "75%" }
                      : { display: "none" }
                  }
                >
                  <TextField
                    className="mb-0"
                    name="keyword"
                    style={{ width: "100%" }}
                    placeholder="Please search name or address"
                    InputProps={{
                      style: { color: "#424242" }
                    }}
                    onChange={handleSearchOnChange}
                    disabled={pendingRestaurants}
                  />
                </div>
              </Grow>
            </ListSubheader>
          }
        >
          <div className="mt-2" style={{ overflow: "scroll" }}>
            {_restaurants.map((r, i) => (
              <RestaurantItem key={r.place_id} index={i} restaurant={r} />
            ))}
          </div>
        </List>
      </div>
    );
  }
);

export default RestaurantsList;
