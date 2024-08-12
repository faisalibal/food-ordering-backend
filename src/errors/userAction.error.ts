/* eslint-disable prettier/prettier */
import { HttpStatus } from '@nestjs/common';
import AppError from './app.error';

class UserActionError extends AppError {
  constructor(message: string, suberror: any[]) {
    super(message, HttpStatus.BAD_REQUEST, UserActionError.name, suberror);
  }

  serializeErrors(): { message: string; status: number; suberrors: any[] }[] {
    return [
      { message: this.message, status: this.status, suberrors: this.suberror },
    ];
  }
}

export default UserActionError;
