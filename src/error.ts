export class ZapNetError extends Error {
  status: number;
  response: any;
  message: string;
  constructor(message: string, status: number, response: any) {
    super(message);
    this.name = "ZapNetError";
    this.message = message;
    this.status = status;
    this.response = response;
  }
}
