import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class TipoDocumentoResponseDto {
  @AutoMap()
  @ApiProperty({ example: '1' })
  id: string;

  @AutoMap()
  @ApiProperty({ example: 'CPF' })
  descricao: string;
}
