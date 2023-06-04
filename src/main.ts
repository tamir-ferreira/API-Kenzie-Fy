import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //habilitar o cors e configurar quem pode acessar a API
  app.enableCors({
    origin: 'http://localhost:3001',
  });

  //configuração para o Swagger
  const config = new DocumentBuilder()
    .setTitle('Musics app')
    .setDescription(' listen your musics ')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config); //montar o documento do Swagger
  SwaggerModule.setup('api', app, document); //'api' é a rota onde vai ficar a doc

  app.useGlobalPipes(
    //vai excluir os campos extras que vierem no body, que não estiverem no dto
    new ValidationPipe({ whitelist: true }),

    //necessário para fazer as outras validações, antes de passar para o hash da senha
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ['transform'] }, //poderia ser qualquer nome
    }),
  );
  await app.listen(3000);
}
bootstrap();
