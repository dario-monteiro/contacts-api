import { Injectable } from '@nestjs/common';
import { mapper } from '../mappings/mapper';
import { RelacionamentoRequestDto } from '../modules/relacionamento/dtos/relacionamento-request.dto';
import { RelacionamentoResponseDto } from '../modules/relacionamento/dtos/relacionamento-response.dto';
import { DBPrismaService } from '../infrastructure/db-infrastructure';
import { Relacionamento } from '../models/model';

@Injectable()
export class RelacionamentoRepository {
  constructor(private readonly dbService: DBPrismaService) {}

  async getAllRelacionamentos(): Promise<RelacionamentoResponseDto[]> {
    try {
      const result = await this.dbService.relacionamento.findMany();
      return result.map((tipoDocumento) => {
        return mapper.map(tipoDocumento, Relacionamento, RelacionamentoResponseDto);
      });
    } finally {
      this.dbService.$disconnect();
    }
  }

  async getRelacionamento(id: number): Promise<RelacionamentoResponseDto> {
    try {
      const result = await this.dbService.relacionamento.findUnique({
        where: { id }
      });
      return mapper.map(result, Relacionamento, RelacionamentoResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async insertRelacionamento(dto: RelacionamentoRequestDto): Promise<RelacionamentoResponseDto> {
    try {
      const relacionamento: Relacionamento = mapper.map(dto, RelacionamentoRequestDto, Relacionamento);
      const result = await this.dbService.relacionamento.create({
        data: relacionamento
      });
      return mapper.map(result, Relacionamento, RelacionamentoResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async updateRelacionamento(id: number, dto: RelacionamentoRequestDto): Promise<RelacionamentoResponseDto> {
    try {
      const relacionamento: Relacionamento = mapper.map(dto, RelacionamentoRequestDto, Relacionamento);
      const result = await this.dbService.relacionamento.update({
        data: relacionamento,
        where: { id }
      });
      return mapper.map(result, Relacionamento, RelacionamentoResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async deleteRelacionamento(id: number): Promise<RelacionamentoResponseDto> {
    try {
      const result = await this.dbService.relacionamento.delete({
        where: { id }
      });
      return mapper.map(result, Relacionamento, RelacionamentoResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }
}
