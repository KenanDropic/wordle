interface Params {
  message: string;
  code: number;
}

export class ErrorResponse extends Error {
  statusCode: number;
  constructor(values: Params) {
    super(values.message);
    this.statusCode = values.code;
  }
}
