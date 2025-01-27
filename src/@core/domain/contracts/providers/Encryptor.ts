export abstract class Encryptor {
  abstract hash(data: string | Buffer, saltOrRounds: number): Promise<string>;
  abstract compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}
