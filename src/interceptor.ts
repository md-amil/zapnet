import { IInterceptor } from "./types";

export default class Interceptor {
  private requestInterceptors: IInterceptor<RequestInit>[] = [];
  private responseInterceptors: IInterceptor<Response>[] = [];

  useRequestInterceptor(
    fulfilled: IInterceptor<RequestInit>["fulfilled"],
    rejected?: IInterceptor<RequestInit>["rejected"]
  ) {
    this.requestInterceptors.push({ fulfilled, rejected });
  }

  useResponseInterceptor(
    fulfilled: IInterceptor<Response>["fulfilled"],
    rejected?: IInterceptor<Response>["rejected"]
  ) {
    console.log("calling response");
    this.responseInterceptors.push({ fulfilled, rejected });
  }

  protected async runRequestInterceptors(
    options: RequestInit
  ): Promise<RequestInit> {
    console.log(this.requestInterceptors);
    for (const interceptor of this.requestInterceptors) {
      try {
        options = await interceptor.fulfilled(options);
      } catch (error) {
        if (interceptor.rejected) {
          interceptor.rejected(error);
        }
      }
    }
    return options;
  }
  protected async runResponseInterceptors(
    response: Response
  ): Promise<Response> {
    for (const interceptor of this.responseInterceptors) {
      try {
        response = await interceptor.fulfilled(response);
      } catch (error) {
        if (interceptor.rejected) {
          interceptor.rejected(error);
        }
      }
    }
    return response;
  }
}
