import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RelacionamentoRequestDto {
  @AutoMap()
  @IsOptional()
  id: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Próprio' })
  descricao: string;
}
