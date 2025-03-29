import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GLOBAL_EXCEPTION_Filter } from './common/filters/GLOBAL_EXCEPTION.filter';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import * as express from 'express'; // Import express
import * as path from 'path'; // Import path for path manipulation
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(
    '/receipts',
    express.static(path.join(__dirname, '..', 'public', 'receipts')),
  );
  console.log(
    'Serving static files from:',
    path.join(__dirname, '..', 'public', 'receipts'),
  );

  app.enableCors({
    origin: '*', // Allow all domains for testing purposes, you can restrict this later
  });
  app.useGlobalFilters(new GLOBAL_EXCEPTION_Filter());
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
