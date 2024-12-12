export class ApiError {
    constructor(
      public statusCode: number,
      public message: string,
      public errorCode: string,
      public data: any | null,
      public timestamp: string,
      public path: string
    ) {}
  }
  