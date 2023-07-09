import { NestFactory, Reflector } from '@nestjs/core';
import { InventoryModule } from './inventory.module';
import { ResponseInterceptor } from '@app/common';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(InventoryModule);
  const moduleRef = app.select(InventoryModule);
  const configService = app.get(ConfigService);

  const reflector = moduleRef.get(Reflector);
  app.useGlobalInterceptors(
    new ResponseInterceptor(reflector),
    new ClassSerializerInterceptor(reflector),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('PORT'));
}
bootstrap();
