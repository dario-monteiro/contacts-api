import { Injectable } from '@nestjs/common';
import { mapper } from '../mappings/mapper';
import { TipoDocumentoRequestDto } from '../modules/tipo-documento/dtos/tipo-documento-request.dto';
import { TipoDocumentoResponseDto } from '../modules/tipo-documento/dtos/tipo-documento-response.dto';
import { DBPrismaService } from '../infrastructure/db-infrastructure';
import { TipoDocumento } from '../models/model';

@Injectable()
export class TipoDocumentoRepository {
  constructor(private readonly dbService: DBPrismaService) {}

  async getAllTiposDocumento(): Promise<TipoDocumentoResponseDto[]> {
    try {
      const result = await this.dbService.tipoDocumento.findMany();
      return result.map((tipoDocumento) => {
        return mapper.map(tipoDocumento, TipoDocumento, TipoDocumentoResponseDto);
      });
    } finally {
      this.dbService.$disconnect();
    }
  }

  async getTipoDocumento(id: number): Promise<TipoDocumentoResponseDto> {
    try {
      const result = await this.dbService.tipoDocumento.findUnique({
        where: { id }
      });
      return mapper.map(result, TipoDocumento, TipoDocumentoResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async insertTipoDocumento(dto: TipoDocumentoRequestDto): Promise<TipoDocumentoResponseDto> {
    try {
      const tipoDocumento: TipoDocumento = mapper.map(dto, TipoDocumentoRequestDto, TipoDocumento);
      const result = await this.dbService.tipoDocumento.create({
        data: tipoDocumento
      });
      return mapper.map(result, TipoDocumento, TipoDocumentoResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async updateTipoDocumento(id: number, dto: TipoDocumentoRequestDto): Promise<TipoDocumentoResponseDto> {
    try {
      const tipoDocumento: TipoDocumento = mapper.map(dto, TipoDocumentoRequestDto, TipoDocumento);
      const result = await this.dbService.tipoDocumento.update({
        data: tipoDocumento,
        where: { id }
      });
      return mapper.map(result, TipoDocumento, TipoDocumentoResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async deleteTipoDocumento(id: number): Promise<TipoDocumentoResponseDto> {
    try {
      const result = await this.dbService.tipoDocumento.delete({
        where: { id }
      });
      return mapper.map(result, TipoDocumento, TipoDocumentoResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }
}
