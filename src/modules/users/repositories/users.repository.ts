import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

// Se todos os método da Classe abstrata forem sem corpo, ela se torna uma Interface.
export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User> | User;
  abstract findAll(): Promise<User[]> | User[];
  abstract findOne(id: string): Promise<User> | User;
  abstract findByEmail(email: string): Promise<User> | User;
  abstract update(id: string, data: UpdateUserDto): Promise<User> | User;
  abstract delete(id: string): Promise<void> | void;
}
