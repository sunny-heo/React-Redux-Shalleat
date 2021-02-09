import service from "./AxiosService";

export default {
  async getAll(filters) {
    try {
      const { results: restaurants } =
        (await service.post("/restaurants/all", filters)) || {};
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
  async getPhotos(photos, width) {
    try {
      const photoUrls = await service.post("/restaurants/photos", {
        photos,
        width
      });
      return photoUrls;
    } catch (error) {
      console.log("Error in getRestaurantPhotos request => ", error);
    }
  }
};
