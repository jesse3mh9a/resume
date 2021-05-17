class Storage {
  constructor(name, storage = localStorage) {
    this.name = name;
    this.storage = storage;
  }

  set value(value) {
    this.storage.setItem(this.name, JSON.stringify(value));
  }

  get value() {
    let value;

    value = this.storage.getItem(this.name);

    try {
      value = JSON.parse(value);
    } catch (error) {}

    return value;
  }

  removeItem() {
    this.storage.removeItem(this.name);
  }
}

export default Storage;
