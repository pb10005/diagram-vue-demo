const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};
export default class Nullable {
  constructor(obj) {
    this.obj = obj;
  }

  static of(obj) {
    return new Nullable(obj);
  }

  static null() {
    return new Nullable(null);
  }

  exec(func) {
    if (isNullOrUndefined(this.obj)) {
      return;
    }
    func(this.obj);
  }

  map(mapper) {
    if (isNullOrUndefined(this.obj)) {
      return Nullable.null();
    }
    return Nullable.of(mapper(this.obj));
  }

  returnOr(value) {
    if (isNullOrUndefined(this.obj)) {
      return value;
    } else {
      return this.obj;
    }
  }
}
