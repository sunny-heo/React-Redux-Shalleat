import React from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers } from "recompose";

import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import RestaurantItem from "./RestaurantItem";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(
  connect(mapStateToProps)
  // withHandlers({
  //   handleSearchOnClick: props => evt => {
  //     evt.preventDefault();
  //     const { revealSubSearch, setRevealSubSearch } = props;
  //     setRevealSubSearch(!revealSubSearch);
  //   }
  // })
);

const RestaurantsList = enhance(
  ({ restaurants, _restaurants = [], handleSearchOnChange, ...restProps }) => {
    const { pendingGetRestaurants: pending } = restaurants;
    return (
      <div className="RestList list-group h-100">
        <List
          component="nav"
          style={{ display: "flex", flexDirection: "column", padding: 0 }}
          subheader={
            <ListSubheader component="div" className="bg-white shadow-sm pt-2">
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                style={{
                  width: "100%"
                }}
                onChange={handleSearchOnChange}
                disabled={pending}
              />
            </ListSubheader>
          }
        >
          {!restaurants || _restaurants.length === 0 ? null : (
            <div className="mt-2" style={{ overflow: "scroll" }}>
              {_restaurants.map((r, i) => (
                <RestaurantItem
                  key={r.place_id}
                  index={i}
                  restaurant={r}
                  {...restProps}
                />
              ))}
            </div>
          )}
        </List>
      </div>
    );
  }
);

export default RestaurantsList;
