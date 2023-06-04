import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
// import { UsersInMemoryRepository } from './repositories/in-memory/users.in-memory.repositoy';
import { PrismaService } from 'src/database/prisma.service';
import { UsersPrismaRepository } from './repositories/prisma/user-prisma.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UsersRepository,
      // useClass: UsersInMemoryRepository,
      // Para utilizar o DB im Memory basta substituir o useClass abaixo, pelo de cima.
      useClass: UsersPrismaRepository,
    },
  ],
  exports: [UsersService], //necessário para utilizar esse service em outros módulos (no nosso caso, no auth para verificar se o usuário existe)
})
export class UsersModule {}
