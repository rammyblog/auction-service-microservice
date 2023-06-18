import { Exclude } from 'class-transformer';

export class UserTransformer {
  id: number;
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserTransformer>) {
    Object.assign(this, partial);
  }
}
