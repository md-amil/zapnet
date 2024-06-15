import { IObject, IOptions } from "./types";

export class Net {
  protected isObject(obj:IObject) {
    return obj && typeof obj === "object" && !Array.isArray(obj);
  }

  *paramGenerator(params: IOptions['params']={}): Generator<[string, any], void, unknown> {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        yield [key, value];
      }
    }
  }

  *entries(obj:IObject ) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        yield [key, obj[key]];
      }
    }
  }

  merge(target: IObject, ...sources: IObject[]) {
    for (const source of sources) {
      for (const [key, value] of this.entries(source)) {
        if (this.isObject(value)) {
          if (!target[key]) target[key] = {};
          this.merge(target[key], value);
          continue;
        }
        target[key] = value;
      }
    }
    return target;
  }
}
