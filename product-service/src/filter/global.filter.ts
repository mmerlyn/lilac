import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/consts/product.consts';

export const getStatusCode = (exception: any): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = (exception: any): string => {
  return String(exception.message);
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = getStatusCode(exception);
    let message = getErrorMessage(exception);

    switch (code) {
      case 404:
        message = ERROR_MESSAGE.NOT_FOUND;
        break;
      default:
        message = ERROR_MESSAGE.SERVER_ERROR;
    }
    if (code === 500) this.logger.error(exception);
    response.status(code).json({
      status: { error: true, message: message },
    });
  }
}
