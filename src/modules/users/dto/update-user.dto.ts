import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { hashSync } from 'bcryptjs';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// export class UpdateUserDto {
//   @ApiProperty({
//     description: 'Nome do usuário',
//     type: String,
//     default: 'Felipe Silva',
//     required: false,
//   })
//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   name: string;

//   @ApiProperty()
//   @IsEmail()
//   @IsNotEmpty()
//   @IsOptional()
//   email: string;

//   @ApiProperty()
//   @IsString()
//   @IsNotEmpty()
//   @MinLength(8)
//   @IsOptional()
//   @Transform(({ value }: { value: string }) => hashSync(value, 10), {
//     groups: ['transform'],
//   })
//   password: string;
// }
