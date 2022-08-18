import { Module } from '@nestjs/common';
import { RelacionamentoService } from './relacionamento.service';
import { RelacionamentoController } from './relacionamento.controller';
import { RelacionamentoRepository } from 'src/repositories/relacionamento.repository';
import { PessoaFisicaRepository } from 'src/repositories/pessoa-fisica.repository';
import { DBPrismaService } from 'src/infrastructure/db-infrastructure';

@Module({
  providers: [RelacionamentoService, RelacionamentoRepository, PessoaFisicaRepository, DBPrismaService],
  controllers: [RelacionamentoController],
  exports: [RelacionamentoService, RelacionamentoRepository, PessoaFisicaRepository, DBPrismaService]
})
export class RelacionamentoModule {}
