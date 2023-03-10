import {IQueryParams, IRating} from "../interfaces";
import {ratingEnum} from "../constants";

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

/*  setupQuery: (page: string = '1', perPage: string = '20', sortOrder: string = ratingEnum.HIGH, filterBy: string = ''): IQueryParams => {
    return {
      page: `${page}`,
      perPage: `${perPage}`,
      sortOrder: `${sortOrder}`,
      filterBy: `${filterBy}`,
    };
  },*/
};

export { commonHelper };
