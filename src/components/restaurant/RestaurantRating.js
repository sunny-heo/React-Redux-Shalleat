import React from "react";
import StarRatings from "react-star-ratings";

const RestaurantRating = ({ rating }) => {
  return (
    <div className="d-flex align-items-center">
      <span
        className="mr-2 font-weight-bold"
        style={{ transform: "translateY(-2px)", fontSize: "1.5vh" }}
      >
        {rating.toString().length === 1 ? `${rating}.0` : rating}
      </span>
      <StarRatings
        rating={rating}
        starRatedColor="#ff9800"
        starDimension="2vh"
        starSpacing="3px"
      />
    </div>
  );
};

export default RestaurantRating;
