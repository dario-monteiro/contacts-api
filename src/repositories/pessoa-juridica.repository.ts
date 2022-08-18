import { Injectable } from '@nestjs/common';
import { DBPrismaService } from '../infrastructure/db-infrastructure';
import { mapper } from '../mappings/mapper';
import { EmpresaResponseDto } from '../modules/pessoa-juridica/dtos/empresa-response.dto';
import { EnderecoResponseDto } from '../modules/dtos/endereco-response.dto';
import { EmpresaInsertDto } from '../modules/pessoa-juridica/dtos/empresa-insert.dto';
import { EmpresaUpdateDto } from '../modules/pessoa-juridica/dtos/empresa-update.dto';
import { EnderecoInsertDto } from '../modules/dtos/endereco-insert.dto';
import { EnderecoUpdateDto } from '../modules/dtos/endereco-update.dto';
import { Endereco, PessoaJuridica } from '../models/model';

@Injectable()
export class PessoaJuridicaRepository {
  constructor(private readonly dbService: DBPrismaService) {}

  private resultMapping(pj: any): EmpresaResponseDto {
    if (!pj) return undefined;
    const endereco = mapper.map(pj.endereco, Endereco, EnderecoResponseDto);
    const empresa = mapper.map(pj, PessoaJuridica, EmpresaResponseDto);
    empresa.endereco = endereco;
    return empresa;
  }

  async getAllPessoasJuridicas(): Promise<EmpresaResponseDto[]> {
    try {
      const result = await this.dbService.pessoaJuridica.findMany({
        include: {
          endereco: true
        }
      });
      return result.map((pj) => {
        return this.resultMapping(pj);
      });
    } finally {
      this.dbService.$disconnect();
    }
  }

  async getPessoaJuridica(id: number): Promise<EmpresaResponseDto> {
    try {
      const result = await this.dbService.pessoaJuridica.findUnique({
        where: { id },
        include: {
          endereco: true
        }
      });
      return this.resultMapping(result);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async insertPessoaJuridica(dto: EmpresaInsertDto): Promise<EmpresaResponseDto> {
    try {
      const result = await this.dbService.$transaction(async (dbService) => {
        const enderecoIn: Endereco = mapper.map(dto.endereco, EnderecoInsertDto, Endereco);
        const enderecoOut = await dbService.endereco.create({
          data: enderecoIn
        });
        dto.endereco.id = enderecoOut.id.toString();
        const pjIn: PessoaJuridica = mapper.map(dto, EmpresaInsertDto, PessoaJuridica);
        return await dbService.pessoaJuridica.create({
          data: pjIn,
          include: { endereco: true }
        });
      });
      return this.resultMapping(result);
    } finally {
      this.dbService.$disconnect();
    }
  }
  async updatePessoaJuridica(id: number, dto: EmpresaUpdateDto): Promise<EmpresaResponseDto> {
    try {
      const result = await this.dbService.$transaction(async (dbService) => {
        const enderecoIn: Endereco = mapper.map(dto.endereco, EnderecoUpdateDto, Endereco);
        await dbService.endereco.update({
          data: enderecoIn,
          where: { id: enderecoIn.id }
        });
        const pessoaIn: PessoaJuridica = mapper.map(dto, EmpresaUpdateDto, PessoaJuridica);
        return await dbService.pessoaJuridica.update({
          data: pessoaIn,
          include: { endereco: true },
          where: { id }
        });
      });
      return this.resultMapping(result);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async deletePessoaJuridica(id: number): Promise<EmpresaResponseDto> {
    try {
      const result = await this.dbService.pessoaJuridica.delete({
        where: { id }
      });
      return mapper.map(result, PessoaJuridica, EmpresaResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }
}
