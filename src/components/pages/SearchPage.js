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
        />
      </FormControl>
    </div>
  );
});

export default SearchPage;
