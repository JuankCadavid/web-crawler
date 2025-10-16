import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/errors.filter';
import { ResponseInterceptor } from './common/response.interceptor';
import * as express from 'express';
import { Handler, Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

let cachedServer: Handler;

async function createExpressApp(): Promise<express.Application> {
  const expressApp = express();
  
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter, {
    logger: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['log', 'debug', 'error', 'verbose', 'warn'],
  });

  // Global pipes and filters
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Swagger setup (only in development)
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('IGAD Innovations Hub API')
      .setDescription('AI-powered tools for agricultural innovation and policy development')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.init();
  return expressApp;
}

async function bootstrap(): Promise<Handler> {
  if (!cachedServer) {
    const expressApp = await createExpressApp();
    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const server = await bootstrap();
  return new Promise((resolve, reject) => {
    server(event, context, (error: any, result: APIGatewayProxyResult) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
