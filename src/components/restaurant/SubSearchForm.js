import React from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers } from "recompose";
import { extractType, extractRadius } from "../../_helpers/searchPageHelper";
import { getRestaurants, setKeyword } from "../../actions/restaurantAction";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";

const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(
  connect(mapStateToProps),
  withState("filters", "setFilters", {}),
  withState("userInput", "setUserInput", {}),
  withHandlers({
    handleOnChange: props => evt => {
      evt.preventDefault();
      const { value: input } = evt.currentTarget;
      props.setUserInput(input);
    },
    handleOnKeyPress: props => evt => {
      if (evt.key === "Enter") {
        const { dispatch, user, userInput } = props;
        const currentLocation = user.location;
        const typeKeyword = extractType(userInput);
        const radius = extractRadius(userInput) || 5000;

        dispatch(getRestaurants({ ...currentLocation, radius, typeKeyword }));
        dispatch(setKeyword(userInput));
      }
    }
  })
);

const SubSearchForm = enhance(({ handleOnChange, handleOnKeyPress, style }) => {
  return (
    <FormControl>
      <TextField
        className="mb-0"
        name="keyword"
        style={style}
        placeholder="e.g. Canadian Food in 5km"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: { color: "#424242" }
        }}
        // onChange={handleOnChange}
        // onKeyPress={handleOnKeyPress}
      />
    </FormControl>
  );
});

export default SubSearchForm;
