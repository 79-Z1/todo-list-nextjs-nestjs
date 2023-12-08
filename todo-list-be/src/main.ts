import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configSwagger } from './config/api-docs.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' });
  configSwagger(app);

  await app.listen(3001);
}
bootstrap();
