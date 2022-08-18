import { Module } from '@nestjs/common';
import { PessoaFisicaService } from './pessoa-fisica.service';
import { PessoaFisicaController } from './pessoa-fisica.controller';
import { PessoaFisicaRepository } from '../../repositories/pessoa-fisica.repository';
import { DBPrismaService } from '../../infrastructure/db-infrastructure';

@Module({
  providers: [PessoaFisicaService, PessoaFisicaRepository, DBPrismaService],
  controllers: [PessoaFisicaController],
  exports: [PessoaFisicaService, PessoaFisicaRepository, DBPrismaService]
})
export class PessoaFisicaModule {}
