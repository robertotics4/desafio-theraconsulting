import { User } from '@core/domain';

export type FindOneFilters = { id?: string; email?: string };

export abstract class UserRepository {
  abstract create(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User>;

  abstract findOne(filters: FindOneFilters): Promise<User>;
}
