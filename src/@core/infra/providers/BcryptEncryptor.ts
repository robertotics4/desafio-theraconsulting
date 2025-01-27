import * as bcrypt from 'bcrypt';
import { Encryptor } from '@core/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BCryptEncryptor implements Encryptor {
  async hash(data: string | Buffer, saltOrRounds: number): Promise<string> {
    return await bcrypt.hash(data, saltOrRounds);
  }

  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(data, encrypted);
  }
}
