import { IRating } from "../interfaces";
import { ratingEnum } from "../constants";
import { URLSearchParamsInit } from "react-router-dom";

const commonHelper = {
  scrollToUp: (): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  },

  setupRatingProps: (rating: string = "1", color: string): IRating => {
    return {
      ratingValue: Number(rating),
      iconsCount: 5,
      size: 20,
      readonly: true,
      fillColor: color,
      emptyColor: "#999999",
    };
  },

  setupQuery: (
    page: string = "1",
    perPage: string = "20",
    sortOrder: string = ratingEnum.HIGH,
    filterBy: string[] = []
  ): URLSearchParamsInit => {
    return {
      page: `${page}`,
      perPage: `${perPage}`,
      sortOrder: `${sortOrder}`,
      filterBy: `${filterBy.join(";")}`,
    };
  },

  setupQueryToSave: (query: URLSearchParams) => {
    return {
      page: query.get("page"),
      perPage: query.get("perPage"),
      sortOrder: query.get("sortOrder"),
      filterBy: query.get("filterBy")?.split(";"),
    };
  },

};

export { commonHelper };
