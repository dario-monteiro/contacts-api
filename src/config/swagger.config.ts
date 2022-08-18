import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static configSwagger(app) {
    // Setting up Swagger document
    const options = new DocumentBuilder()
      .setTitle('Contacts API')
      .setDescription('API de Contatos')
      .setVersion('1.0')
      .addBearerAuth(
        {
          description: `Please enter valid token (without Bearer prefix)`,
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header'
        },
        'accessToken'
      )
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('swagger', app, document);
  }
}
