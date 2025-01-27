import { Injectable } from '@nestjs/common';
import { name, author, license, version } from '../../package.json';

export type ApiInfo = {
  name: string;
  version: string;
  author: string;
  license: string;
};

@Injectable()
export class AppService {
  getApiInfo(): ApiInfo {
    return {
      name,
      author,
      license,
      version,
    };
  }
}
