import { BadRequestException, Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { MusicsRepository } from './repositories/music.repository';
// import { MusicsInMemoryRepository } from './repositories/in-memory/musics.in-memory.repository';
import { PrismaService } from 'src/database/prisma.service';
import { MusicsPrismaRepository } from './repositories/prisma/musics-prisma.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    // configuração necessária para fazer uploads dos arquivos
    MulterModule.register({
      storage: diskStorage({
        destination: './tmp',
        //utilizado para manter o mesmo nome do arquivo que está sendo upado
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
      }),

      //utilizado para filtrar os tipo de arquivos permitidos
      fileFilter: (_, file, cb) => {
        if (
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/webp' ||
          file.mimetype === 'audio/mpeg'
        ) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only jpeg/mp3 format allowed'), false);
        }
      },
    }),
  ],
  controllers: [MusicsController],
  providers: [
    MusicsService,
    PrismaService,
    {
      provide: MusicsRepository,
      // para utilizar o DB em memória,
      // useClass: MusicsInMemoryRepository,
      useClass: MusicsPrismaRepository,
    },
  ],
})
export class MusicsModule {}
