import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';

export class User {
  readonly id: string;
  name: string;
  email: string;

  // utilizado em conjunto com o plainToInstance do class-transformer lá no repository
  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
  }
}
