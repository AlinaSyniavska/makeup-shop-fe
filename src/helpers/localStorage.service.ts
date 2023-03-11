const localStorageHelper = {
  getArrayFromLocalStorage: (key: string) => {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : [];
  },

  setArrayToLocalStorage: (key: string, obj: any): void => {
    localStorage.setItem(key, JSON.stringify(obj));
  },

};

export { localStorageHelper };
