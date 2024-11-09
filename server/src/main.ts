import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GLOBAL_EXCEPTION_Filter } from './common/filters/GLOBAL_EXCEPTION.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GLOBAL_EXCEPTION_Filter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
