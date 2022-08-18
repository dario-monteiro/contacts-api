import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EnderecoResponseDto {
  @AutoMap()
  @ApiProperty({ example: '1' })
  id: string;

  @AutoMap()
  @ApiProperty({ example: 'Rua das flores' })
  logradouro: string;

  @AutoMap()
  @ApiProperty({ example: '123' })
  numero: string;

  @AutoMap()
  @ApiPropertyOptional({ example: 'Apto 202' })
  complemento?: string;

  @AutoMap()
  @ApiPropertyOptional({ example: 'Centro' })
  bairro?: string;

  @AutoMap()
  @ApiProperty({ example: 'São Paulo' })
  cidade: string;

  @AutoMap()
  @ApiProperty({ example: 'SP' })
  estado: string;

  @AutoMap()
  @ApiProperty({ example: 'Brasil' })
  pais: string;

  @AutoMap()
  @ApiProperty({ example: '01110-020' })
  cep: string;
}
