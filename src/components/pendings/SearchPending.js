import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

const SearchPending = ({
  style = {},
  size = 48,
  thickness = 4,
  display = "flex",
  pending,
  handleOnClick
}) => {
  return (
    <div style={{ display, justifyContent: "center" }}>
      <div style={{ position: "relative" }}>
        {pending && (
          <CircularProgress
            style={{
              position: "absolute",
              color: "#ff4081",
              ...style
            }}
            size={size}
            thickness={thickness}
          />
        )}
        <IconButton
          aria-label="MainSearch"
          onClick={handleOnClick}
          disabled={pending}
        >
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SearchPending;
