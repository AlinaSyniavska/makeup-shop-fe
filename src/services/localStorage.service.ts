const localStorageService = {
  getFromLocalStorage: (key: string) => {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : [];
  },

  setToLocalStorage: (key: string, obj: any): void => {
    localStorage.setItem(key, JSON.stringify(obj));
  },
};

export { localStorageService };
