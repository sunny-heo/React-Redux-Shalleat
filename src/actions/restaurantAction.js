import restaurantConstants from "../_constants/restaurantConstants";
import restaurantService from "../_requests/restaurantService";
import { format } from "date-fns";

const {
  RESTAURANT_ALL_PENDING,
  RESTAURANT_ALL_REJECTED,
  RESTAURANT_ALL_FULFILLED,

  RESTAURANT_DETAILS_PENDING,
  RESTAURANT_DETAILS_REJECTED,
  RESTAURANT_DETAILS_FULFILLED,

  RESTAURANT_PHOTOS_PENDING,
  RESTAURANT_PHOTOS_REJECTED,
  RESTAURANT_PHOTOS_FULFILLED,

  SET_KEYWORD,
  RESTAURANT_OPEN_ITEM
} = restaurantConstants;

export const getRestaurants = filters => async dispatch => {
  dispatch({ type: RESTAURANT_ALL_PENDING });
  try {
    const restaurants = await restaurantService.getAll(filters);
    dispatch({ type: RESTAURANT_ALL_FULFILLED, payload: restaurants });
  } catch (error) {
    dispatch({ type: RESTAURANT_ALL_REJECTED, payload: error });
  }
};

export const getRestaurantDetails = placeId => async dispatch => {
  dispatch({ type: RESTAURANT_DETAILS_PENDING });
  const filters = [
    "name",
    "opening_hours",
    "formatted_phone_number",
    "international_phone_number",
    "price_level",
    "website",
    "photos",
    "reviews"
  ];
  const date = new Date();
  const day = date.getDay();
  const hour_and_munites = format(date, "HHMM");

  try {
    const restaurants = await restaurantService.getDetails({
      placeId,
      filters,
      day,
      hour_and_munites
    });
    dispatch({ type: RESTAURANT_DETAILS_FULFILLED, payload: restaurants });
  } catch (error) {
    dispatch({ type: RESTAURANT_DETAILS_REJECTED, payload: error });
  }
};

export const getPhotos = (photos, width) => async dispatch => {
  dispatch({ type: RESTAURANT_PHOTOS_PENDING });

  try {
    const restaurants = await restaurantService.getPhotos({ photos, width });
    dispatch({ type: RESTAURANT_PHOTOS_FULFILLED, payload: restaurants });
  } catch (error) {
    dispatch({ type: RESTAURANT_PHOTOS_REJECTED, payload: error });
  }
};

export const setKeyword = keyword => dispatch => {
  dispatch({ type: SET_KEYWORD, payload: keyword });
};

export const setItemOpen = (openedPlaceId, opened) => dispatch => {
  dispatch({ type: RESTAURANT_OPEN_ITEM, payload: { openedPlaceId, opened } });
};
