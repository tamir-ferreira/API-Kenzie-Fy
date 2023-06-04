import { Injectable } from '@nestjs/common';
import { MusicsRepository } from '../music.repository';
import { CreateMusicDTO } from '../../dto/create-music.dto';
import { Music } from '../../entities/music.entitie';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateMusicDto } from '../../dto/update-music.dto';

@Injectable()
export class MusicsPrismaRepository implements MusicsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMusicDTO, userId: string): Promise<Music> {
    const music = new Music();
    Object.assign(music, {
      ...data,
      cover_image: data.cover_image || null,
      music_url: data.music_url || null,
    });

    const newMusic = await this.prisma.music.create({
      data: { ...music, userId },
      /* data: {
        id: music.id,
        album: music.album,
        artist: music.artist,
        genre: music.genre,
        name: music.name,
        year: music.year,
        cover_image: music.cover_image,
        music_url: music.music_url,
        userId,
      }, */
    });

    return newMusic;
  }

  async findOne(id: string): Promise<Music> {
    const music = await this.prisma.music.findUnique({
      where: { id },
    });

    return music;
  }

  private groupby(musics: Music[], key: string) {
    return musics.reduce((acc, cur) => {
      (acc[cur[key]] = acc[cur[key]] || []).push(cur);
      return acc;
    }, {});
  }

  async findAll(group: string): Promise<object | Music[]> {
    const musics = await this.prisma.music.findMany({
      /* include: { //traz o usuário da relação
        user: {
          select: { //permite selecionar os campos do usuário
            name: true,
            email: true,
          },
        },
      }, */
    });
    if (group) {
      return this.groupby(musics, group);
    }
    return musics;
  }

  //para a atualização dos links das imagens e músicas vindos do Upload
  async update(data: UpdateMusicDto, musicId: string): Promise<Music> {
    const music = await this.prisma.music.update({
      where: {
        id: musicId,
      },
      data: { ...data },
    });

    return music;
  }
}
