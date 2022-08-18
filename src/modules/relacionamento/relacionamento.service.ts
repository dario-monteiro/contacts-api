import { Injectable } from '@nestjs/common';
import { PessoaFisicaRepository } from '../../repositories/pessoa-fisica.repository';
import { RelacionamentoRepository } from '../../repositories/relacionamento.repository';
import { RelacionamentoRequestDto } from './dtos/relacionamento-request.dto';
import { RelacionamentoResponseDto } from './dtos/relacionamento-response.dto';

@Injectable()
export class RelacionamentoService {
  /* istanbul ignore next */
  constructor(
    private readonly repository: RelacionamentoRepository,
    private readonly pfRepository: PessoaFisicaRepository
  ) {}

  async getAllRelacionamentos(): Promise<RelacionamentoResponseDto[]> {
    return await this.repository.getAllRelacionamentos();
  }

  async getRelacionamento(id: number): Promise<RelacionamentoResponseDto> {
    return await this.repository.getRelacionamento(id);
  }

  async insertRelacionamento(relacionamento: RelacionamentoRequestDto): Promise<RelacionamentoResponseDto> {
    return await this.repository.insertRelacionamento(relacionamento);
  }

  async updateRelacionamento(
    id: number,
    relacionamento: RelacionamentoRequestDto
  ): Promise<RelacionamentoResponseDto> {
    return await this.repository.updateRelacionamento(id, relacionamento);
  }

  async deleteRelacionamento(id: number): Promise<RelacionamentoResponseDto> {
    const pf = await this.pfRepository.getPessoaFisicaByRelacionamento(id);
    if (pf) {
      throw new Error('Não é possível deletar um relacionamento em uso por uma pessoa.');
    }
    return await this.repository.deleteRelacionamento(id);
  }
}
