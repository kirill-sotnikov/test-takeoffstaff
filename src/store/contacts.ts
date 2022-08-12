import { makeAutoObservable } from "mobx";

interface ContactType {
  name: string;
  phone: string;
  id: string | number;
}

class Contacts {
  value: ContactType[] = [
    {
      name: "Test",
      phone: "89997776655",
      id: 1,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addContact(item: ContactType) {
    this.value = [...this.value, item];
  }

  removeContact(id: ContactType["id"]) {
    this.value = this.value.filter((item) => item.id !== id);
  }

  changeContact(item: ContactType) {
    const copyValue = this.value;
    const currentItem =
      copyValue.find((element) => element.id === item.id) || null;
    if (currentItem) {
      copyValue[copyValue.indexOf(currentItem)] = {
        name: item.name,
        phone: item.phone,
        id: item.id,
      };
      this.value = copyValue;
    }
  }
}

export default new Contacts();
