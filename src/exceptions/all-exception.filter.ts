import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message;
    const stack = exception.stack;
    const path = httpAdapter.getRequestUrl(ctx.getRequest());

    const responseBody = {
      statusCode,
      timestamp: new Date().toISOString(),
      message,
      path
    };

    this.logger.error(message, stack, path);

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
