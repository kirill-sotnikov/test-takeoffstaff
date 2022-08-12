import { makeAutoObservable } from "mobx";

class Search {
  value: string = "";
  constructor() {
    makeAutoObservable(this);
  }

  setSearchValue(newValue: string) {
    this.value = newValue;
  }
}

export default new Search();
