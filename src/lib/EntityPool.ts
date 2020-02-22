export class EntityPool {
  factory: Function;
  recycled: object[];
  constructor(factory: Function) {
    this.factory = factory;
    this.recycled = [];
  }

  get = () => {
    if (this.recycled.length) {
      const obj = this.recycled.pop();
      return obj;
    } else return this.factory();
  };

  recycle = (obj: object) => this.recycled.push(obj);
}
