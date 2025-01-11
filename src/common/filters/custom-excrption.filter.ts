import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import path from 'path';

@Catch(HttpException)
export class DevExceptionsFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();

    const exceptionError = exception.getResponse();
    const error =
      typeof exceptionError === 'string'
        ? { message: exceptionError }
        : (exceptionError as object);

    const errorStack = exception.stack
      .split('\n')
      .map((line) =>
        line.trim().startsWith('at ') ? line.trim().substring(3) : line.trim(),
      );

    response.status(status).json({
      statusCode: status,
      //timestamp: new Date().toISOString(),
      //path: request.url,
      // message: exception.message,
      ...error,
      // stack: exception.stack,
      // stack: errorStack,
    });
  }
}
