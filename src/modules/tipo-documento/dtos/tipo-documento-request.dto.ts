import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TipoDocumentoRequestDto {
  @AutoMap()
  @IsOptional()
  id: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'CPF' })
  descricao: string;
}
