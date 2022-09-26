const commonStore = (key: string) => {
  const store = JSON.parse(localStorage.getItem(key) as string) ?? {};
  const save = () => {
    localStorage.setItem(key, JSON.stringify(store));
  };

  return {
    get(key: string) {
      return store[key];
    },
    set(key: string, value: any) {
      store[key] = value;
      save();
    },
    delete(key: string) {
      delete store[key];
      save();
    },
  };
};

export default commonStore;
