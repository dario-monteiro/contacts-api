import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TipoDocumentoPessoaDto {
  @AutoMap()
  @IsNotEmpty()
  id: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'CPF' })
  descricao: string;
}
