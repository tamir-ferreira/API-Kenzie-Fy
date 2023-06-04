import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

// Se todos os método da Classe abstrata forem sem corpo, ela se torna uma Interface.
// Seria equivalente a fazer:

/* export interface UsersRepository {
  create(data: CreateUserDto): Promise<User> | User;
  findAll(): Promise<User[]> | User[];
  findOne(id: string): Promise<User> | User;
  findByEmail(email: string): Promise<User> | User;
  update(id: string, data: UpdateUserDto): Promise<User> | User;
  delete(id: string): Promise<void> | void;
} */

export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User> | User;
  abstract findAll(): Promise<User[]> | User[];
  abstract findOne(id: string): Promise<User> | User;
  abstract findByEmail(email: string): Promise<User> | User;
  abstract update(id: string, data: UpdateUserDto): Promise<User> | User;
  abstract delete(id: string): Promise<void> | void;
}

// Na classe abstrata não é possível realizar uma instância diretamente da classe
// Ex. const user = new UsersRepository()
// É preciso que outra classe implemente a classe para utilizar os métodos listados nela.
