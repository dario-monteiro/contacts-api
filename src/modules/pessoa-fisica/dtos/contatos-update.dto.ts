import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContatosUpdateDto {
  @AutoMap()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: '1' })
  id: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ example: '(11) 3565-1278' })
  telefoneResidencial?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ example: '(11) 3587-9923' })
  telefoneComercial?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '(11) 99865-2398' })
  celular: string;

  @AutoMap()
  @IsString({})
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({ example: 'joao@hotmail.com' })
  emailPessoal?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({ example: 'joao@microsoft.com' })
  emailComercial?: string;
}
