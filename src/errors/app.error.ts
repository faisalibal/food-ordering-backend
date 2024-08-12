/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';

abstract class AppError extends Error {
  suberror: any;
  message: string;
  status: number;
  logger: Logger;

  constructor(
    message: string,
    status?: number,
    instance?: string,
    suberror?: any,
  ) {
    super(message);
    this.message = message;
    this.status = status;
    this.suberror = suberror;
    this.logger = new Logger(instance === undefined ? AppError.name : instance);
    this.logger.error(message);
  }

  getNonUndefinedInstance(_instance, _default) {
    if (_instance === undefined) {
      return _default;
    }
    return _instance;
  }

  abstract serializeErrors():
    | { message: string; status: number; suberrors: any[] }[]
    | null;
}

export default AppError;
