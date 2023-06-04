import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// DTO - data transfer object
export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    type: String,
    default: 'Felipe Silva',
  })
  @IsString({ message: 'deve ser uma string' })
  @IsNotEmpty()
  name: string;

  @ApiProperty() //utilizado para mostrar na doc do Swagger que isso é uma propriedade da API
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(
    ({ value }: { value: string }) => hashSync(value, 10),

    //necessário para fazer as outras validações, antes de passar para o hash da senha
    { groups: ['transform'] },
  )
  password: string;
}
