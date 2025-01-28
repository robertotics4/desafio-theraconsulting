export class User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, data);
  }
}
