import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MusicsModule } from './modules/musics/musics.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, MusicsModule, AuthModule],
})
export class AppModule {}
