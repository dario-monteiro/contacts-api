import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EnderecoUpdateDto } from '../../dtos/endereco-update.dto';
import { EmpresaUpdateDto } from '../../pessoa-juridica/dtos/empresa-update.dto';
import { RelacionamentoPessoaDto } from '../../relacionamento/dtos/relacionamento-pessoa.dto';
import { TipoDocumentoPessoaDto } from '../../tipo-documento/dtos/tipo-documento-pessoa.dto';
import { ContatosUpdateDto } from './contatos-update.dto';

export class PessoaUpdateDto {
  @AutoMap()
  @IsOptional()
  id: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'João da Silva' })
  nome: string;

  @AutoMap(() => EnderecoUpdateDto)
  @ValidateNested()
  @Type(() => EnderecoUpdateDto)
  @ApiProperty()
  endereco: EnderecoUpdateDto;

  @AutoMap(() => ContatosUpdateDto)
  @ValidateNested()
  @Type(() => ContatosUpdateDto)
  @ApiProperty()
  contatos: ContatosUpdateDto;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ example: '1956-09-17' })
  dataNascimento?: string;

  @AutoMap()
  @IsOptional()
  @ApiPropertyOptional({ example: '268.539.788-46' })
  documento?: string;

  @AutoMap(() => TipoDocumentoPessoaDto)
  @ValidateNested()
  @Type(() => TipoDocumentoPessoaDto)
  @ApiProperty({ example: { id: '1' } })
  tipoDocumento: TipoDocumentoPessoaDto;

  @AutoMap(() => EmpresaUpdateDto)
  @ValidateNested()
  @Type(() => EmpresaUpdateDto)
  @ApiProperty({ example: { id: '1' } })
  empresa: EmpresaUpdateDto;

  @AutoMap()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Analista' })
  cargo?: string;

  @AutoMap(() => RelacionamentoPessoaDto)
  @ValidateNested()
  @Type(() => RelacionamentoPessoaDto)
  @ApiProperty({ example: { id: '1' } })
  relacionamento: RelacionamentoPessoaDto;

  @AutoMap()
  @IsOptional()
  @ApiPropertyOptional({ example: 'http://www.joaodasilva.dev' })
  site?: string;
}
