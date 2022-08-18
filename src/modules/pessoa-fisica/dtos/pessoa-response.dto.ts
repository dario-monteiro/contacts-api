import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EnderecoResponseDto } from '../../dtos/endereco-response.dto';
import { EmpresaResponseDto } from '../../pessoa-juridica/dtos/empresa-response.dto';
import { RelacionamentoResponseDto } from '../../relacionamento/dtos/relacionamento-response.dto';
import { TipoDocumentoResponseDto } from '../../tipo-documento/dtos/tipo-documento-response.dto';
import { ContatosResponseDto } from './contatos-response.dto';

export class PessoaResponseDto {
  @AutoMap()
  @ApiProperty({ example: '1' })
  id: string;

  @AutoMap()
  @ApiProperty({ example: 'João da Silva' })
  nome: string;

  @AutoMap(() => EnderecoResponseDto)
  @ApiProperty()
  endereco: EnderecoResponseDto;

  @AutoMap(() => ContatosResponseDto)
  @ApiProperty()
  contatos: ContatosResponseDto;

  @AutoMap()
  @ApiPropertyOptional({ example: '1956-09-17' })
  dataNascimento?: string;

  @AutoMap()
  @ApiPropertyOptional({ example: '268.539.788-46' })
  documento?: string;

  @AutoMap(() => TipoDocumentoResponseDto)
  @ApiProperty()
  tipoDocumento: TipoDocumentoResponseDto;

  @AutoMap(() => EmpresaResponseDto)
  @ApiProperty()
  empresa: EmpresaResponseDto;

  @AutoMap()
  @ApiPropertyOptional({ example: 'Analista' })
  cargo?: string;

  @AutoMap(() => RelacionamentoResponseDto)
  @ApiProperty()
  relacionamento: RelacionamentoResponseDto;

  @AutoMap()
  @ApiPropertyOptional({ example: 'http://www.joaodasilva.dev' })
  site?: string;
}
