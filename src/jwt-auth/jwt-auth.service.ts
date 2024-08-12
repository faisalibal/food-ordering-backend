import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthService {
  verifyTokenFromHeader(authorizationHeader: string): any {
    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authorizationHeader.replace('Bearer ', '');

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  verifyUser(decodedToken: any, id: number) {
    if (decodedToken.customer_id !== id) {
      throw new UnauthorizedException('Not authorized');
    }
  }
}
