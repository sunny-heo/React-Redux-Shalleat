import React from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers } from "recompose";
import { extractType, extractRadius } from "../../_helpers/searchPageHelper";
import { getRestaurants } from "../../actions/restaurantAction";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";

const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(
  connect(mapStateToProps),
  withState("filters", "setFilters", {}),
  withHandlers({
    handleOnChange: props => evt => {
      evt.preventDefault();
      const { user, setFilters } = props;
      const { value: input } = evt.currentTarget;
      const typeKeyword = extractType(input);
      const radius = extractRadius(input) || 5000;
      const currentLocation = user.location;
      setFilters({ ...currentLocation, radius, typeKeyword });
    },
    handleOnKeyPress: props => evt => {
      if (evt.key === "Enter") {
        const { filters, dispatch } = props;
        dispatch(getRestaurants(filters));
      }
    }
  })
);

const MainSearchForm = enhance(({ handleOnChange, handleOnKeyPress }) => {
  return (
    <FormControl>
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
        onChange={handleOnChange}
        onKeyPress={handleOnKeyPress}
      />
    </FormControl>
  );
});

export default MainSearchForm;
