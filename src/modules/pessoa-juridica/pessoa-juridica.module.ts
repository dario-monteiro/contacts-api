import { Module } from '@nestjs/common';
import { PessoaJuridicaService } from './pessoa-juridica.service';
import { PessoaJuridicaController } from './pessoa-juridica.controller';
import { PessoaJuridicaRepository } from 'src/repositories/pessoa-juridica.repository';
import { PessoaFisicaRepository } from 'src/repositories/pessoa-fisica.repository';
import { DBPrismaService } from 'src/infrastructure/db-infrastructure';

@Module({
  providers: [PessoaJuridicaService, PessoaJuridicaRepository, PessoaFisicaRepository, DBPrismaService],
  controllers: [PessoaJuridicaController],
  exports: [PessoaJuridicaService, PessoaJuridicaRepository, PessoaFisicaRepository, DBPrismaService]
})
export class PessoaJuridicaModule {}
