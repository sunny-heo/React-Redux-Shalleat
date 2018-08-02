import service from "./AxiosService";

export default {
  async getAll(filters) {
    try {
      const restaurants = await service.post("/restaurants/all", filters);
      return restaurants;
    } catch (error) {
      console.log("Error in getAllRestaurnts request => ", error);
    }
  },
  async getDetails(restaurant) {
    try {
      const details = await service.post("/restaurants/details", restaurant);
      return details;
    } catch (error) {
      console.log("Error in getRestaurntDetails request => ", error);
    }
  },
  async getPhotos(photosData) {
    try {
      const photos = await service.post("/restaurants/photos", photosData);
      return photos;
    } catch (error) {
      console.log("Error in getRestaurantPhotos request => ", error);
    }
  }
};
