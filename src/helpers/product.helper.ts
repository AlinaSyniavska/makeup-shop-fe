import { ICart, IProductOrdered } from "../interfaces";
import { cartStatusEnum, localStorageItemsEnum } from "../constants";

type ItemCollection = HTMLCollection | NodeList;

const productHelper = {
  checkIsProductAvailable: (totalNumber: number): boolean => {
    return totalNumber > 0;
  },

  searchPressedButton: (list: ItemCollection, target: EventTarget): HTMLElement => {
    let button;

    for (let i = 0; i < list.length; i++) {
      if (list[i] === target) {
        button = list[i];
      }
    }

    return button as HTMLElement;
  },

  prepareOrderForDB: (order: IProductOrdered[], total: number): ICart => {
    return {
      products: order,
      userId: localStorage.getItem(localStorageItemsEnum.ID_LOGIN_USER) || '',
      status: cartStatusEnum.IN_PROGRESS,
      sum: Number(total.toFixed(2)),
    };
  },

};

export { productHelper };
