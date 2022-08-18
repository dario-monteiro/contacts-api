import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EnderecoInsertDto {
  @AutoMap()
  @IsOptional()
  id: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Rua das flores' })
  logradouro: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({ example: '123' })
  numero: string;

  @AutoMap()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Apto 202' })
  complemento?: string;

  @AutoMap()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Centro' })
  bairro?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'São Paulo' })
  cidade: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'SP' })
  estado: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Brasil' })
  pais: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '01110-020' })
  cep: string;
}
