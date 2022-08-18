import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EnderecoInsertDto } from '../../dtos/endereco-insert.dto';

export class EmpresaInsertDto {
  @AutoMap()
  @IsOptional()
  id: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Microsoft Corporation S/A' })
  razaoSocial: string;

  @AutoMap()
  @IsOptional()
  @ApiPropertyOptional({ example: '44.901.463/0001-08' })
  cnpj?: string;

  @AutoMap(() => EnderecoInsertDto)
  @ValidateNested()
  @Type(() => EnderecoInsertDto)
  @ApiProperty()
  endereco: EnderecoInsertDto;

  @AutoMap()
  @IsOptional()
  @ApiPropertyOptional({ example: 'http://www.microsoft.com' })
  site?: string;
}
