import {
  NestFactory,
} from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import passport from 'passport';
import {
  AppModule,
} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.use(passport.initialize());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Soare')
    .setDescription('The Soare API description')
    .setVersion('1.0')
    .addTag('soare')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
