import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContatosResponseDto {
  @AutoMap()
  @ApiPropertyOptional({ example: '1' })
  id: string;

  @AutoMap()
  @ApiPropertyOptional({ example: '(11) 3565-1278' })
  telefoneResidencial?: string;

  @AutoMap()
  @ApiPropertyOptional({ example: '(11) 3587-9923' })
  telefoneComercial?: string;

  @AutoMap()
  @ApiProperty({ example: '(11) 99865-2398' })
  celular: string;

  @AutoMap()
  @ApiPropertyOptional({ example: 'joao@hotmail.com' })
  emailPessoal?: string;

  @AutoMap()
  @ApiPropertyOptional({ example: 'joao@microsoft.com' })
  emailComercial?: string;
}
