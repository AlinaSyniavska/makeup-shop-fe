type ElementsCollection = HTMLCollection | NodeList;

const productHelper = {
  checkIsProductAvailable: (totalNumber: number): boolean => {
    return totalNumber > 0;
  },

  searchPressedButton: (
    list: ElementsCollection,
    target: EventTarget
  ): HTMLElement => {
    let button;

    for (let i = 0; i < list.length; i++) {
      if (list[i] === target) {
        button = list[i];
      }
    }

    return button as HTMLElement;
  },

};

export { productHelper };
