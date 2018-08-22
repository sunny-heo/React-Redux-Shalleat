import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers } from "recompose";
import { extractType, extractRadius } from "../../_helpers/searchPageHelper";
import { getRestaurants, setKeyword } from "../../actions/restaurantAction";

import Grow from "@material-ui/core/Grow";
import TextField from "@material-ui/core/TextField";
import SearchPending from "../pendings/SearchPending";

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

const NavSearchForm = enhance(
  ({
    classes,
    keyword,
    revealInput,
    style,
    pending,
    handleSearchIcon,
    handleOnChange,
    handleOnKeyPress
  }) => {
    return (
      <Fragment>
        <div className={classes.navItemContainer}>
          <SearchPending pending={pending} handleOnClick={handleSearchIcon} />
          <Grow in={!revealInput}>
            <div
              style={
                !revealInput
                  ? {
                      width: "160px",
                      textAlign: "center"
                    }
                  : { display: "none" }
              }
            >
              <span>{`Search: ${keyword || "no results"}`}</span>
            </div>
          </Grow>
          <Grow in={revealInput}>
            <div style={revealInput ? { width: "160px" } : { display: "none" }}>
              <TextField
                className="mb-0"
                name="keyword"
                style={style}
                placeholder=""
                InputProps={{
                  style: { color: "#424242" }
                }}
                onChange={handleOnChange}
                onKeyPress={handleOnKeyPress}
                disabled={pending}
              />
            </div>
          </Grow>
        </div>
      </Fragment>
    );
  }
);

export default NavSearchForm;
