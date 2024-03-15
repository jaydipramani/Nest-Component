import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { ParseDatePipe } from './parse.date.pipe';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  await app.listen(3000);
  app. enableShutdownHooks(); 
  const configService = app.get(ConfigService)
  const port = configService.get<number>('port')
  console.log(port)
}
bootstrap();
