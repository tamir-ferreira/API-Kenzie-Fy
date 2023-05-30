import { PartialType } from '@nestjs/swagger';
import { CreateMusicDTO } from './create-music.dto';

export class UpdateMusicDto extends PartialType(CreateMusicDTO) {}
