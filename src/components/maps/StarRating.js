import React from "react";
import StarRatings from "react-star-ratings";

const StarRating = ({ rating, totalStars }) => {
  console.log(totalStars);
  return (
    <StarRatings
      rating={rating}
      starRatedColor="#ff9800"
      starDimension="3vh"
      starSpacing="5px"
      totalStars={totalStars || 8}
    />
  );
};

export default StarRating;
