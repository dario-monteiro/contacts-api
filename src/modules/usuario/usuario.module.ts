import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from 'src/repositories/usuario.repository';
import { DBPrismaService } from 'src/infrastructure/db-infrastructure';

@Module({
  providers: [UsuarioService, UsuarioRepository, DBPrismaService],
  controllers: [UsuarioController],
  exports: [UsuarioService, UsuarioRepository, DBPrismaService]
})
export class UsuarioModule {}
