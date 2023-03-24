import { URLSearchParamsInit } from "react-router-dom";

import { IRating } from "../interfaces";
import { ratingColorEnum, ratingEnum } from "../constants";

const commonHelper = {
  scrollToUp: (): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  },

  setupRatingProps: (rating: string = "1", color: string = ratingColorEnum.MAIN_RATING_COLOR): IRating => {
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

  calculatePagesCount: (pageSize: number, totalCount: number): number => {
    // we suppose that if we have 0 items we want 1 empty page
    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
  },

  isPaginationVisible: (states: boolean[]): boolean => {
    return states.every(state => !state);
  },

};

export { commonHelper };
