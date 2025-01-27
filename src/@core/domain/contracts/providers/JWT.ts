import { Jwt, Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';

export abstract class JWT {
  abstract sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: Secret,
    options?: SignOptions | undefined,
  ): string;

  abstract verify(
    token: string,
    secretOrPublicKey: Secret,
    options?: VerifyOptions & {
      complete: true;
    },
  ): Jwt;

  abstract getTokenExpirationInSeconds(): number;
}
