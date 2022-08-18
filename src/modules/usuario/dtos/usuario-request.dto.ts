import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UsuarioRequestDto {
  @AutoMap()
  @IsOptional()
  id: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(7)
  @ApiProperty({ example: 'joao@hotmail.com' })
  email: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: '********' })
  senha: string;
}
