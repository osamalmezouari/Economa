import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    const { method, url, body, query, headers } = request;

    // Log request details
    this.logRequest(method, url, body, query, headers);

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const elapsedTime = Date.now() - startTime;
        this.logResponse(method, url, response.statusCode, elapsedTime);
      }),
    );
  }

  private logRequest(
    method: string,
    url: string,
    body: any,
    query: any,
    headers: any,
  ) {
    const logMessage = `
      Request:
      - Method: ${method}
      - URL: ${url}
      - Body: ${JSON.stringify(body)}
      - Query: ${JSON.stringify(query)}
      - Headers: ${JSON.stringify(headers)}
    `;

    this.logger.log(logMessage);
  }

  private logResponse(
    method: string,
    url: string,
    statusCode: number,
    elapsedTime: number,
  ) {
    const logMessage = `
      Response:
      - Method: ${method}
      - URL: ${url}
      - Status Code: ${statusCode}
      - Time Taken: ${elapsedTime}ms
    `;

    this.logger.log(logMessage);
  }
}
