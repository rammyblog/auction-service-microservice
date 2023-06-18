import { NestFactory, Reflector } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from '../interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const moduleRef = app.select(AuthModule);
  const reflector = moduleRef.get(Reflector);
  app.useGlobalInterceptors(
    new ResponseInterceptor(reflector),
    new ClassSerializerInterceptor(reflector),
  );
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();
