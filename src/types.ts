
export interface IOptions extends RequestInit {
    params?: Record<string, any>;
  }
  export interface IZapNet {
    baseUrl?: string;
    options?: IOptions;
  }
  
  export type IObject = Record<string, any>;
  export type TMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  