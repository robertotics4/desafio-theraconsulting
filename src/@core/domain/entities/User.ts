export class User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, user);
  }
}
