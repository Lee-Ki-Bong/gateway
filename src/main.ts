import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
    },
    { inheritAppConfig: true }, // 하이브리드 애플리케이션은 HTTP 기반 전역 파이프, 인터셉터, 가드 및 필터를 사용하기 위함.
  );

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
