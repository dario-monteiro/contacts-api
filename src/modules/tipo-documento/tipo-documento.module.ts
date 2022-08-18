import { Module } from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento.service';
import { TipoDocumentoController } from './tipo-documento.controller';
import { TipoDocumentoRepository } from '../../repositories/tipo-documento.repository';
import { PessoaFisicaRepository } from '../../repositories/pessoa-fisica.repository';
import { DBPrismaService } from '../../infrastructure/db-infrastructure';

@Module({
  providers: [TipoDocumentoService, TipoDocumentoRepository, PessoaFisicaRepository, DBPrismaService],
  controllers: [TipoDocumentoController],
  exports: [TipoDocumentoService, TipoDocumentoRepository, PessoaFisicaRepository, DBPrismaService]
})
export class TipoDocumentoModule {}
