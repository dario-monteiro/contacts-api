import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EnderecoUpdateDto } from '../../dtos/endereco-update.dto';

export class EmpresaUpdateDto {
  @AutoMap()
  @IsOptional()
  id: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'Microsoft Corporation S/A' })
  razaoSocial: string;

  @AutoMap()
  @IsOptional()
  @ApiPropertyOptional({ example: '44.901.463/0001-08' })
  cnpj?: string;

  @AutoMap(() => EnderecoUpdateDto)
  @ValidateNested()
  @Type(() => EnderecoUpdateDto)
  @ApiProperty()
  endereco: EnderecoUpdateDto;

  @AutoMap()
  @IsOptional()
  @ApiPropertyOptional({ example: 'http://www.microsoft.com' })
  site?: string;
}
