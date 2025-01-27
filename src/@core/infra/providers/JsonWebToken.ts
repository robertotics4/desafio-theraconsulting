import * as jwt from 'jsonwebtoken';
import { JWT } from '@core/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JsonWebToken implements JWT {
  private readonly TOKEN_EXPIRATION_IN_SECONDS = 86400;

  sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: string,
    options?: any,
  ): string {
    return jwt.sign(payload, secretOrPrivateKey, options);
  }

  verify(token: string, secretOrPublicKey: string, options: any): jwt.Jwt {
    return jwt.verify(token, secretOrPublicKey, options);
  }

  getTokenExpirationInSeconds(): number {
    return this.TOKEN_EXPIRATION_IN_SECONDS;
  }
}
