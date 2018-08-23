import React, { Fragment } from "react";

import RestaurantsPending from "../pendings/CircularPending";
import TextField from "@material-ui/core/TextField";
import Grow from "../common/transitions/Grow";

const RestaurantTopItem = ({
  revealSubSearch,
  handleSearchOnChange,
  restaurants,
  _restaurants
}) => {
  const { pendingGetRestaurants } = restaurants;
  console.log(pendingGetRestaurants);
  const TextFieldComponent = () => (
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
  );
  const keywordComponent = () => (
    <span>{`Search: ${_restaurants.keyword || "no results"}`}</span>
  );

  return pendingGetRestaurants /*true*/ ? (
    <RestaurantsPending
      style={{ display: "inline-block", width: "30px", height: "30px" }}
    />
  ) : (
    <Fragment>
      <Grow
        show={revealSubSearch}
        style={{ display: "inline-block", width: "75%" }}
        component={TextFieldComponent}
      />
      <Grow
        show={!revealSubSearch}
        style={{ display: "inline-block", width: "75%" }}
        component={keywordComponent}
      />
    </Fragment>
  );
};

export default RestaurantTopItem;
