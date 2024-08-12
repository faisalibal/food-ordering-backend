/* eslint-disable prettier/prettier */
import { HttpException, UnauthorizedException } from '@nestjs/common';
import BadRequestError from './bad-request.errors';
import EntityNotFoundError from './entity-notfound.error';
import ServiceError from './service.error';
import UnauthorizedError from './unauthorized.error';
import UserActionError from './userAction.error';

export class ErrorController {
  handleException(exception: Error) {
    if (exception instanceof EntityNotFoundError) {
      console.log('masuk');
      const response = {
        message: exception.message,
        details: exception.suberror,
        time: new Date(),
      };
      throw new HttpException(response, exception.status);
    }

    if (exception instanceof ServiceError) {
      const response = {
        message: exception.message,
        details: exception.suberror,
        time: new Date(),
      };
      throw new HttpException(response, exception.status);
    }

    if (exception instanceof BadRequestError) {
      const response = {
        message: exception.message,
        details: exception.suberror,
        time: new Date(),
      };
      throw new HttpException(response, exception.status);
    }

    if (exception instanceof UnauthorizedError) {
      const response = {
        message: exception.message,
        details: exception.suberror,
        time: new Date(),
      };
      throw new UnauthorizedException(response);
    }

    if (exception instanceof UserActionError) {
      const response = {
        message: exception.message,
        details: exception.suberror,
        time: new Date(),
      };
      throw new HttpException(response, exception.status);
    }
  }
}
