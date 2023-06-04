import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dtos/login.dto';

/* interface IUserLogin{ //caso não utilize a doc gerada pelo Swagger 
  email: string,
  password: string
} */
@ApiTags('login') //para adicionar a tag de Login do Swagger
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  @UseGuards(LocalAuthGuard) //utilizado para validar o email e senha antes mesmo de chamar o service de login
  async login(@Body() user: LoginDTO) {
    // async login(@Body() user: IUserLogin) { //caso não utilize a doc gerada pelo Swagger
    return this.authService.login(user.email);
  }
}
