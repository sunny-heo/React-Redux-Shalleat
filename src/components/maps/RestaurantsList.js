import React from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers, lifecycle } from "recompose";

import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import RestaurantItem from "./RestaurantItem";
import SubSearchForm from "../maps/SubSearchForm";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

import TextField from "@material-ui/core/TextField";
import Grow from "@material-ui/core/Grow";

const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(
  connect(mapStateToProps),
  withState("revealSubSearch", "setRevealSubSearch", false),
  withState("_restaurants", "_setRestaurants", []),
  lifecycle({
    componentDidMount() {
      const { _setRestaurants, restaurants } = this.props;
      _setRestaurants([...restaurants.list]);
    },
    componentDidUpdate(prevProps) {
      const { _setRestaurants, restaurants } = this.props;
      if (this.props.restaurants !== prevProps.restaurants) {
        _setRestaurants([...restaurants.list]);
      }
    }
  }),
  withHandlers({
    handleSearchOnClick: props => evt => {
      evt.preventDefault();
      const { revealSubSearch, setRevealSubSearch } = props;
      setRevealSubSearch(!revealSubSearch);
    },
    handleSearchOnChange: props => evt => {
      evt.preventDefault();
      const [...restaurants] = props.restaurants.list || [];
      const searchKeyword = evt.currentTarget.value;
      const filteredRestaurants = restaurants.filter(
        r =>
          r.name.toLowerCase().includes(searchKeyword) ||
          r.vicinity.toLowerCase().includes(searchKeyword)
      );
      props._setRestaurants(filteredRestaurants);
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
              <IconButton
                className=""
                aria-label="sub-search-box"
                style={{ dispaly: "inline-block" }}
                onClick={handleSearchOnClick}
              >
                <SearchIcon />
              </IconButton>
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
                  />
                </div>
              </Grow>
            </ListSubheader>
          }
        >
          {_restaurants.map((r, i) => (
            <RestaurantItem key={r.place_id} index={i} restaurant={r} />
          ))}
        </List>
      </div>
    );
  }
);

export default RestaurantsList;
