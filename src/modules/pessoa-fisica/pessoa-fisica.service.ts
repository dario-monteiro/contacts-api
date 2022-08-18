import { Injectable } from '@nestjs/common';
import { PessoaFisicaRepository } from '../../repositories/pessoa-fisica.repository';
import { PessoaInsertDto } from './dtos/pessoa-insert.dto';
import { PessoaResponseDto } from './dtos/pessoa-response.dto';
import { PessoaUpdateDto } from './dtos/pessoa-update.dto';

@Injectable()
export class PessoaFisicaService {
  /* istanbul ignore next */
  constructor(private readonly repository: PessoaFisicaRepository) {}

  async getAllPessoasFisicas(): Promise<PessoaResponseDto[]> {
    return await this.repository.getAllPessoasFisicas();
  }

  async getPessoaFisica(id: number): Promise<PessoaResponseDto> {
    return await this.repository.getPessoaFisica(id);
  }

  async insertPessoaFisica(pessoa: PessoaInsertDto): Promise<PessoaResponseDto> {
    return await this.repository.insertPessoaFisica(pessoa);
  }

  async updatePessoaFisica(id: number, pessoa: PessoaUpdateDto): Promise<PessoaResponseDto> {
    return await this.repository.updatePessoaFisica(id, pessoa);
  }

  async deletePessoaFisica(id: number): Promise<PessoaResponseDto> {
    return await this.repository.deletePessoaFisica(id);
  }
}
