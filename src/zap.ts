import { ZapNetError } from "./error";
import { Net } from "./net";
import { IOptions } from "./types";

export class Zap extends Net {
  protected filterParams(params: IOptions["params"] = {}): IOptions["params"] {
    return Object.fromEntries(this.paramGenerator(params));
  }
  getBaseUrl() {
    throw new Error("Method 'getBaseUrl()' must be implemented.");
  }
  protected parseUri(url: string, options?: IOptions) {
    console.log(this.getBaseUrl(), "getting base url");
    const uri = url.startsWith("http") ? url : this.getBaseUrl() + url;
    if (options?.params) {
      const params = new URLSearchParams(this.filterParams(options.params));
      return `${uri}?${params}`;
    }
    return uri;
  }
  protected parseResponse<T>(res: Response) {
    return new Promise(async (resolve: (value: T) => void, reject) => {
      try {
        if (!res.ok) {
          const errorBody = await res.json();
          return reject(
            new ZapNetError(`Error: ${res.statusText}`, res.status, errorBody)
          );
        }
        resolve(await res.json());
      } catch (e) {
        reject(new ZapNetError(`Error: ${res.statusText}`, res.status, e));
      }
    });
  }
  protected parseBody(body: string | object) {
    return typeof body == "object" ? JSON.stringify(body) : body;
  }
}
