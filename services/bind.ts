export default class BindService {
  constructor() {
    this.bindMethods()
  }

  protected bindMethods() {
    const propertyNames = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this),
    ) as Array<keyof this>

    propertyNames.forEach((name) => {
      const property = this[name]
      if (
        typeof property === "function" &&
        name !== "constructor" &&
        name !== "bindMethods"
      ) {
        this[name] = property.bind(this)
      }
    })
  }
}
