import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";

const mapStateToProps = (state, nextOwnProps) => state;

const enhance = compose(connect(mapStateToProps));
const SearchPage = enhance(props => {
  return (
    <FormControl className="">
      <TextField
        className="mb-0"
        name="keyword"
        style={{ width: "300px" }}
        placeholder="e.g. Canadian Food in 5km"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          // className: classes.input,
          style: { color: "#424242" }
        }}
        // autoComplete="username email"
      />
    </FormControl>
  );
});

export default SearchPage;
