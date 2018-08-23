import React from "react";
import StarRatings from "react-star-ratings";

const StarRating = ({ rating }) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="#ff9800"
      starDimension="3vh"
      starSpacing="5px"
    />
  );
};

export default StarRating;
