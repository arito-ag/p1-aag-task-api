import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('+process.env.PORT:', +process.env.PORT);
  console.log(' +process.env.DB_PORT:', +process.env.DB_PORT);
  const app = await NestFactory.create(AppModule);
  await app.listen(+process.env.PORT);
}
bootstrap();
