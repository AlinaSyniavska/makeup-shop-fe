const localStorageService = {
  getFromLocalStorage: (key: string) => {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : [];
  },
};

export { localStorageService };
