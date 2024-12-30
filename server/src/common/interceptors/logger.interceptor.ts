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
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const body = request.body;
    const query = request.query;
    const headers = request.headers;
    this.logger.log(
      `${method} ${url} - Request Body: ${JSON.stringify(body)} - Query: ${JSON.stringify(query)} - Headers: ${JSON.stringify(headers)}`,
    );

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const elapsedTime = Date.now() - now;
        this.logger.log(`${method} ${url} ${statusCode} - ${elapsedTime}ms`);
      }),
    );
  }
}
