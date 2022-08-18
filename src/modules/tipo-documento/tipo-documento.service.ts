import { Injectable, NotFoundException } from '@nestjs/common';
import { TipoDocumentoResponseDto } from './dtos/tipo-documento-response.dto';
import { PessoaFisicaRepository } from '../../repositories/pessoa-fisica.repository';
import { TipoDocumentoRepository } from '../../repositories/tipo-documento.repository';
import { TipoDocumentoRequestDto } from './dtos/tipo-documento-request.dto';

@Injectable()
export class TipoDocumentoService {
  /* istanbul ignore next */
  constructor(
    private readonly repository: TipoDocumentoRepository,
    private readonly pfRepository: PessoaFisicaRepository
  ) {}

  async getAllTiposDocumento(): Promise<TipoDocumentoResponseDto[]> {
    const result = await this.repository.getAllTiposDocumento();
    return result;
  }

  async getTipoDocumento(id: number): Promise<TipoDocumentoResponseDto> {
    const result = await this.repository.getTipoDocumento(id);
    return result;
  }

  async insertTipoDocumento(tipoDocumento: TipoDocumentoRequestDto): Promise<TipoDocumentoResponseDto> {
    return await this.repository.insertTipoDocumento(tipoDocumento);
  }

  async updateTipoDocumento(
    id: number,
    tipoDocumento: TipoDocumentoRequestDto
  ): Promise<TipoDocumentoResponseDto> {
    return await this.repository.updateTipoDocumento(id, tipoDocumento);
  }

  async deleteTipoDocumento(id: number): Promise<TipoDocumentoResponseDto> {
    const pf = await this.pfRepository.getPessoaFisicaByTipoDocumento(id);
    if (pf) {
      throw new Error('Não é possível deletar um tipo documento em uso por uma pessoa');
    }
    return await this.repository.deleteTipoDocumento(id);
  }
}
