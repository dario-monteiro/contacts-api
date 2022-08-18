import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioResponseDto {
  @AutoMap()
  @ApiProperty({ example: '1' })
  id: string;

  @AutoMap()
  @ApiProperty({ example: 'joao@hotmail.com' })
  email: string;

  @AutoMap()
  @ApiProperty({ example: '********' })
  senha: string;
}
