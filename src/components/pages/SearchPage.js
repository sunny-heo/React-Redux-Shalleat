import React from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers } from "recompose";
import { extractType, extractRadius } from "../../_helpers/searchPageHelper";
import { getRestaurants } from "../../actions/restaurantAction";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";

const WAIT_INTERVAL = 1000;
const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(
  connect(mapStateToProps),
  withState("timerId", "setTimerId", null),
  withHandlers({
    handleOnChange: props => evt => {
      evt.preventDefault();
      const { timerId, setTimerId, user } = props;
      const { value: input } = evt.currentTarget;
      const typeKeyword = extractType(input);
      const radius = extractRadius(input) || 5000;
      const currentLocation = user.location;
      const filters = { ...currentLocation, radius, typeKeyword };

      clearTimeout(timerId);

      setTimerId(
        setTimeout(() => {
          props.dispatch(getRestaurants(filters));
        }, WAIT_INTERVAL)
      );
    }
  })
);
const SearchPage = enhance(props => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-start m-5"
      style={{ height: "90vh" }}
    >
      <h1>What shall we eat?</h1>
      <FormControl className="">
        <TextField
          className="mb-0"
          name="keyword"
          style={{ width: "50vw" }}
          placeholder="e.g. Canadian Food in 5km"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: { color: "#424242" }
          }}
          onChange={props.handleOnChange}
        />
      </FormControl>
    </div>
  );
});

export default SearchPage;
