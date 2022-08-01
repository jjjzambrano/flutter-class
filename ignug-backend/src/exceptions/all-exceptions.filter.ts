import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ErrorResponseHttpModel } from '@shared/models';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const errorResponseHttpModel: ErrorResponseHttpModel = {
      error: 'Server Error',
      message: 'Server Error',
      statusCode: 500,
    };
    let status = 500;

    if (exception instanceof HttpException) {
      const { message } = exception.getResponse() as ErrorResponseHttpModel;
      status = exception.getStatus();

      if (exception instanceof UnprocessableEntityException) {
        errorResponseHttpModel.error = 'Bad Request';
        errorResponseHttpModel.message = message;
      }

      if (exception instanceof UnauthorizedException) {
        errorResponseHttpModel.error = 'Unauthorized';
        errorResponseHttpModel.message = 'You do not have authorization.';
      }

      if (exception instanceof NotFoundException) {
        errorResponseHttpModel.error = 'Route/Model not found';
        errorResponseHttpModel.message = message;
      }

      if (exception instanceof ForbiddenException) {
        errorResponseHttpModel.error = 'Forbidden';
        errorResponseHttpModel.message = message;
      }

      errorResponseHttpModel.statusCode = exception.getStatus();
    }

    if (exception instanceof QueryFailedError) {
      status = 400;
      errorResponseHttpModel.statusCode = parseInt(exception.driverError.code);
      errorResponseHttpModel.error = exception.name;
      errorResponseHttpModel.message = exception.driverError.detail;
    }

    response.status(status).json(errorResponseHttpModel);
  }
}
