import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

const successBtnColor = success => (success ? { background: "#40ffbe" } : {});

const SearchPending = ({
  rootStyle = {},
  pendingStyle = {},
  size = 40,
  thickness = 4,
  pending,
  success,
  handleOnClick
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", ...rootStyle }}>
      <div style={{ position: "relative" }}>
        {pending && (
          <CircularProgress
            style={{
              position: "absolute",
              color: "#ff4081",
              zIndex: 10,
              ...pendingStyle
            }}
            size={size}
            thickness={thickness}
          />
        )}
        <IconButton
          aria-label="MainSearch"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            ...successBtnColor(success)
          }}
          onClick={handleOnClick}
          disabled={pending}
        >
          <SearchIcon
            style={success ? { color: "#fff" } : { color: "#424242" }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default SearchPending;
