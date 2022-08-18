import { Injectable } from '@nestjs/common';
import { DBPrismaService } from '../infrastructure/db-infrastructure';
import { mapper } from '../mappings/mapper';
import { PessoaResponseDto } from '../modules/pessoa-fisica/dtos/pessoa-response.dto';
import { EnderecoResponseDto } from '../modules/dtos/endereco-response.dto';
import { ContatosResponseDto } from '../modules/pessoa-fisica/dtos/contatos-response.dto';
import { EmpresaResponseDto } from '../modules/pessoa-juridica/dtos/empresa-response.dto';
import { RelacionamentoResponseDto } from '../modules/relacionamento/dtos/relacionamento-response.dto';
import { TipoDocumentoResponseDto } from '../modules/tipo-documento/dtos/tipo-documento-response.dto';
import { PessoaInsertDto } from '../modules/pessoa-fisica/dtos/pessoa-insert.dto';
import { ContatosInsertDto } from '../modules/pessoa-fisica/dtos/contatos-insert.dto';
import { PessoaUpdateDto } from '../modules/pessoa-fisica/dtos/pessoa-update.dto';
import { ContatosUpdateDto } from '../modules/pessoa-fisica/dtos/contatos-update.dto';
import { EnderecoInsertDto } from '../modules/dtos/endereco-insert.dto';
import { EnderecoUpdateDto } from '../modules/dtos/endereco-update.dto';
import {
  Contatos,
  Endereco,
  PessoaFisica,
  PessoaJuridica,
  Relacionamento,
  TipoDocumento
} from '../models/model';

@Injectable()
export class PessoaFisicaRepository {
  constructor(private readonly dbService: DBPrismaService) {}

  private resultMapping(pf: any): PessoaResponseDto {
    if (!pf) return undefined;
    const endereco = mapper.map(pf.endereco, Endereco, EnderecoResponseDto);
    const contatos = mapper.map(pf.contatos, Contatos, ContatosResponseDto);
    const enderecoPj = mapper.map(pf.empresa.endereco, Endereco, EnderecoResponseDto);
    const empresa = mapper.map(pf.empresa, PessoaJuridica, EmpresaResponseDto);
    empresa.endereco = enderecoPj;
    const relacionamento = mapper.map(pf.relacionamento, Relacionamento, RelacionamentoResponseDto);
    const tipoDocumento = mapper.map(pf.tipoDocumento, TipoDocumento, TipoDocumentoResponseDto);
    const pessoa = mapper.map(pf, PessoaFisica, PessoaResponseDto);
    pessoa.endereco = endereco;
    pessoa.contatos = contatos;
    pessoa.empresa = empresa;
    pessoa.relacionamento = relacionamento;
    pessoa.tipoDocumento = tipoDocumento;
    return pessoa;
  }

  async getAllPessoasFisicas(): Promise<PessoaResponseDto[]> {
    try {
      const result = await this.dbService.pessoaFisica.findMany({
        include: {
          contatos: true,
          empresa: {
            include: {
              endereco: true
            }
          },
          endereco: true,
          relacionamento: true,
          tipoDocumento: true
        }
      });
      return result.map((pf) => {
        return this.resultMapping(pf);
      });
    } finally {
      this.dbService.$disconnect();
    }
  }

  async getPessoaFisica(id: number): Promise<PessoaResponseDto> {
    try {
      const result = await this.dbService.pessoaFisica.findUnique({
        where: { id },
        include: {
          contatos: true,
          empresa: {
            include: {
              endereco: true
            }
          },
          endereco: true,
          relacionamento: true,
          tipoDocumento: true
        }
      });
      return this.resultMapping(result);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async getPessoaFisicaByPessoaJuridica(idPj: number): Promise<PessoaResponseDto> {
    try {
      const result = await this.dbService.pessoaFisica.findFirst({
        where: { pessoaJuridicaId: idPj }
      });
      return mapper.map(result, PessoaFisica, PessoaResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async getPessoaFisicaByRelacionamento(idRelacionamento: number): Promise<PessoaResponseDto> {
    try {
      const result = await this.dbService.pessoaFisica.findFirst({
        where: { relacionamentoId: idRelacionamento }
      });
      return mapper.map(result, PessoaFisica, PessoaResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async getPessoaFisicaByTipoDocumento(idTipoDocumento: number): Promise<PessoaResponseDto> {
    try {
      const result = await this.dbService.pessoaFisica.findFirst({
        where: { tipoDocumentoId: idTipoDocumento }
      });
      return mapper.map(result, PessoaFisica, PessoaResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async insertPessoaFisica(dto: PessoaInsertDto): Promise<PessoaResponseDto> {
    try {
      const result = await this.dbService.$transaction(async (dbService) => {
        const contatosIn: Contatos = mapper.map(dto.contatos, ContatosInsertDto, Contatos);
        const contatosOut = await dbService.contatos.create({
          data: contatosIn
        });
        dto.contatos.id = contatosOut.id.toString();
        const enderecoIn: Endereco = mapper.map(dto.endereco, EnderecoInsertDto, Endereco);
        const enderecoOut = await dbService.endereco.create({
          data: enderecoIn
        });
        dto.endereco.id = enderecoOut.id.toString();
        const pessoaIn: PessoaFisica = mapper.map(dto, PessoaInsertDto, PessoaFisica);
        return await dbService.pessoaFisica.create({
          data: pessoaIn,
          include: {
            contatos: true,
            empresa: {
              include: {
                endereco: true
              }
            },
            endereco: true,
            relacionamento: true,
            tipoDocumento: true
          }
        });
      });
      return this.resultMapping(result);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async updatePessoaFisica(id: number, dto: PessoaUpdateDto): Promise<PessoaResponseDto> {
    try {
      const result = await this.dbService.$transaction(async (dbService) => {
        const contatosIn: Contatos = mapper.map(dto.contatos, ContatosUpdateDto, Contatos);
        await dbService.contatos.update({
          data: contatosIn,
          where: { id: contatosIn.id }
        });
        const enderecoIn: Endereco = mapper.map(dto.endereco, EnderecoUpdateDto, Endereco);
        await dbService.endereco.update({
          data: enderecoIn,
          where: { id: enderecoIn.id }
        });
        const pessoaIn: PessoaFisica = mapper.map(dto, PessoaUpdateDto, PessoaFisica);
        return await dbService.pessoaFisica.update({
          data: pessoaIn,
          include: {
            contatos: true,
            empresa: {
              include: {
                endereco: true
              }
            },
            endereco: true,
            relacionamento: true,
            tipoDocumento: true
          },
          where: { id }
        });
      });
      return this.resultMapping(result);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async deletePessoaFisica(id: number): Promise<PessoaResponseDto> {
    try {
      const result = await this.dbService.pessoaFisica.delete({
        where: { id }
      });
      return mapper.map(result, PessoaFisica, PessoaResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }
}
