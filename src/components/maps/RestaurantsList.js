import React from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers } from "recompose";

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
  withHandlers({
    handleSearchOnClick: props => evt => {
      evt.preventDefault();
      const { revealSubSearch, setRevealSubSearch } = props;
      setRevealSubSearch(!revealSubSearch);
      console.log(revealSubSearch);
    }
  })
);

const RestaurantsList = enhance(props => {
  const { revealSubSearch, handleSearchOnClick } = props;
  const { list: restaurants, keyword, ...restProps } = props.restaurants;
  // console.log(handleSearchOnClick);
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
              {/* <SubSearchForm style={{ width: "60%" }} /> */}
            </IconButton>
            <Grow in={!revealSubSearch}>
              <div
                style={
                  !revealSubSearch
                    ? { display: "inline-block", width: "75%" }
                    : { display: "none" }
                }
              >
                {`Search: ${keyword || "no results"}`}
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
                  placeholder=""
                  InputProps={{
                    style: { color: "#424242" }
                  }}
                  // onChange={handleOnChange}
                  // onKeyPress={handleOnKeyPress}
                />
              </div>
            </Grow>
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
