import React, { FC } from "react";
import { Rating } from "react-simple-star-rating";

import { IRating } from "../../interfaces";

interface IProps {
  ratingProps: IRating;
}

const StarRating: FC<IProps> = ({ ratingProps }) => {
  const { ratingValue, iconsCount, size, readonly, fillColor, emptyColor } = ratingProps;

  return (
    <React.Fragment>
      <Rating
        ratingValue={ratingValue * 20}
        iconsCount={iconsCount}
        size={size}
        readonly={readonly}
        fillColor={fillColor}
        emptyColor={emptyColor}
      />
    </React.Fragment>
  );
};

export { StarRating };
