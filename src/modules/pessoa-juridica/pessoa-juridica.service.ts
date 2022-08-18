import { Injectable } from '@nestjs/common';
import { PessoaFisicaRepository } from '../../repositories/pessoa-fisica.repository';
import { PessoaJuridicaRepository } from '../../repositories/pessoa-juridica.repository';
import { EmpresaInsertDto } from './dtos/empresa-insert.dto';
import { EmpresaResponseDto } from './dtos/empresa-response.dto';
import { EmpresaUpdateDto } from './dtos/empresa-update.dto';

@Injectable()
export class PessoaJuridicaService {
  /* istanbul ignore next */
  constructor(
    private readonly repository: PessoaJuridicaRepository,
    private readonly pfRepository: PessoaFisicaRepository
  ) {}

  async getAllPessoasJuridicas(): Promise<EmpresaResponseDto[]> {
    return await this.repository.getAllPessoasJuridicas();
  }

  async getPessoaJuridica(id: number): Promise<EmpresaResponseDto> {
    return await this.repository.getPessoaJuridica(id);
  }

  async insertPessoaJuridica(empresa: EmpresaInsertDto): Promise<EmpresaResponseDto> {
    return await this.repository.insertPessoaJuridica(empresa);
  }

  async updatePessoaJuridica(id: number, empresa: EmpresaUpdateDto): Promise<EmpresaResponseDto> {
    return await this.repository.updatePessoaJuridica(id, empresa);
  }

  async deletePessoaJuridica(id: number): Promise<EmpresaResponseDto> {
    const pj = await this.pfRepository.getPessoaFisicaByPessoaJuridica(id);
    if (pj) {
      throw new Error('Não é possível deletar uma empresa em uso por uma pessoa.');
    }

    return await this.repository.deletePessoaJuridica(id);
  }
}
