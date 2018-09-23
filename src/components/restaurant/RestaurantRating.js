import React from "react";
import StarRatings from "react-star-ratings";

const RestaurantRating = ({ rating }) => {
  return (
    // <Fragment>
    //   <StarRatings
    //     rating={rating}
    //     starRatedColor="#ff9800"
    //     starDimension="2vh"
    //     starSpacing="3px"
    //   />
    //   <span>{rating}</span>
    // </Fragment>
    <div className="d-flex align-items-center">
      <StarRatings
        rating={rating}
        starRatedColor="#ff9800"
        starDimension="2vh"
        starSpacing="3px"
      />
      <span
        className="ml-2 font-weight-bold"
        style={{ transform: "translateY(-1.5px)", fontSize: "1.5vh" }}
      >
        {rating}
      </span>
    </div>
  );
};

export default RestaurantRating;
