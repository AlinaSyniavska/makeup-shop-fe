import {IRating} from "../interfaces";

const commonHelper = {
    scrollToUp: (): void => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    },

    makeRatingProps: (rating: string = '1', color: string): IRating => {
        return  {
            ratingValue: Number(rating),
            iconsCount: 5,
            size: 20,
            readonly: true,
            fillColor: color,
            emptyColor: '#999999',
        }
    },
}

export {
    commonHelper
}
