import { IOptions, IZapNet } from "./types";
import { Zap } from "./zap";
const DEFAULT_HEADERS = {
  accept: "application/json",
  "Content-ype": "application/json",
};
export class ZapNet extends Zap {
  private baseUrl: string;
  private options: IOptions;
  private currentOptions: IOptions = {};

  constructor({ baseUrl = "", options }: IZapNet) {
    super();
    this.baseUrl = baseUrl;
    this.options = {
      ...options,
      method: "GET",
    };
  }
  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const finalOptions = this.merge(
      { cache: "no-cache" },
      this.options,
      options,
      this.currentOptions
    );
    const response = await fetch(this.parseUri(url, options), finalOptions);
    return this.parseResponse<T>(response);
  }

  getBaseUrl() {
    return this.baseUrl;
  }
  create({ baseUrl, options = {} }: IZapNet) {
    return new ZapNet({
      baseUrl: baseUrl || this.baseUrl,
      options: this.merge(this.options, options),
    });
  }

  get headers() {
    return this.options.headers;
  }

  setHeaders(headers: HeadersInit) {
    this.merge(this.currentOptions, { headers });
    return this;
  }
  setOptions(options: RequestInit) {
    this.merge(this.currentOptions, options);
  }

  authorize(token: string) {
    this.merge(this.options, { headers: { authorization: "Bearer " + token } });
    return this;
  }

  async get<T>(url: string, options: IOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  async post<T>(url: string, body: object | string): Promise<T> {
    return this.request<T>(url, { method: "POST", body: this.parseBody(body) });
  }

  async put<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, { method: "PUT", body: this.parseBody(body) });
  }

  async delete(url: string, options: IOptions = {}) {
    return this.request(url, { ...options, method: "DELETE" });
  }

  async patch<T>(url: string, body: string | object): Promise<T> {
    return fetch(this.baseUrl + url, {
      ...this.options,
      method: "PATCH",
      body: this.parseBody(body),
    }).then((res) => this.parseResponse<T>(res));
  }
}

const zapNet = new ZapNet({
  options: {
    headers: DEFAULT_HEADERS,
  },
});

export default zapNet;
