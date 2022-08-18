import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EnderecoResponseDto } from '../../dtos/endereco-response.dto';

export class EmpresaResponseDto {
  @AutoMap()
  @ApiProperty({ example: '1' })
  id: string;

  @AutoMap()
  @ApiProperty({ example: 'Microsoft Corporation S/A' })
  razaoSocial: string;

  @AutoMap()
  @ApiPropertyOptional({ example: '44.901.463/0001-08' })
  cnpj?: string;

  @AutoMap(() => EnderecoResponseDto)
  @ApiProperty()
  endereco: EnderecoResponseDto;

  @AutoMap()
  @ApiPropertyOptional({ example: 'http://www.microsoft.com' })
  site?: string;
}
