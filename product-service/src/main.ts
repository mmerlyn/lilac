import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filter/global.filter';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const GRPC_URL = process.env.GRPC_HOST;
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: GRPC_URL,
      package: 'product',
      protoPath: [join(__dirname, './proto/product.service.proto')],
    },
  });
  await app.startAllMicroservices();
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();

  await app.listen(3002);
}
bootstrap();
