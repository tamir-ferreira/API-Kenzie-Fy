import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDTO } from './dto/create-music.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('musics') //para adicionar a tag de Musics do Swagger
@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Post('')
  @UseGuards(JwtAuthGuard) //utilizado para validação do token nesta rota
  @ApiBearerAuth() //utilizado para o Swagger solicitar o jwt nesta rota na documentação
  create(@Body() createMusicDTO: CreateMusicDTO, @Request() req) {
    //@request serve para capturar o id do usuário da requisição
    return this.musicsService.create(createMusicDTO, req.user.id);
  }

  @Get('')
  //para que o parâmetro group não seja obrigatório na doc do Swagger
  @ApiQuery({
    name: 'group',
    type: String,
    required: false,
    description: 'informe artist, genre, album para trazer um item agrupado',
  })
  findAll(@Query('group') group: string | undefined) {
    return this.musicsService.findAll(group);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicsService.findOne(id);
  }

  @Patch('upload/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover_image', maxCount: 1 }, //alterar para o máximo de arquivos permitidos no upload
      { name: 'music', maxCount: 1 },
    ]),
  )
  upload(
    @UploadedFiles()
    files: {
      cover_image?: Express.Multer.File[]; // necessário instalar as tipagens do multer antes
      music?: Express.Multer.File[];
    },
    @Param('id') id: string,
  ) {
    const { cover_image, music } = files;

    return this.musicsService.upload(cover_image[0], music[0], id); //caso venha mais arquivos, é possível pegá-los nas outras posições dos arrays.
  }
}
