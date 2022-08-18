import { Injectable, NotFoundException } from '@nestjs/common';
import { mapper } from '../mappings/mapper';
import { UsuarioRequestDto } from '../modules/usuario/dtos/usuario-request.dto';
import { UsuarioResponseDto } from '../modules/usuario/dtos/usuario-response.dto';
import { DBPrismaService } from '../infrastructure/db-infrastructure';
import { Usuario } from '../models/model';

@Injectable()
export class UsuarioRepository {
  constructor(private readonly dbService: DBPrismaService) {}

  async getAllUsuarios(): Promise<UsuarioResponseDto[]> {
    try {
      const result = await this.dbService.usuario.findMany();
      if (!result) throw new NotFoundException('Usuários não encontrados');
      return result.map((usuario) => {
        return mapper.map(usuario, Usuario, UsuarioResponseDto);
      });
    } finally {
      this.dbService.$disconnect();
    }
  }

  async getUsuario(id: number): Promise<UsuarioResponseDto> {
    try {
      const result = await this.dbService.usuario.findUnique({
        where: { id }
      });
      if (!result) throw new NotFoundException('Usuário não encontrado');
      return mapper.map(result, Usuario, UsuarioResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async getUsuarioByEmail(email: string): Promise<UsuarioResponseDto> {
    try {
      const result = await this.dbService.usuario.findFirst({
        where: { email }
      });
      return mapper.map(result, Usuario, UsuarioResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async insertUsuario(dto: UsuarioRequestDto): Promise<UsuarioResponseDto> {
    try {
      const usuario: Usuario = mapper.map(dto, UsuarioRequestDto, Usuario);
      const result = await this.dbService.usuario.create({
        data: usuario
      });
      return mapper.map(result, Usuario, UsuarioResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async updateUsuario(id: number, dto: UsuarioRequestDto): Promise<UsuarioResponseDto> {
    try {
      const usuario: Usuario = mapper.map(dto, UsuarioRequestDto, Usuario);
      const result = await this.dbService.usuario.update({
        data: usuario,
        where: { id }
      });
      return mapper.map(result, Usuario, UsuarioResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }

  async deleteUsuario(id: number): Promise<UsuarioResponseDto> {
    try {
      const result = await this.dbService.usuario.delete({
        where: { id }
      });
      return mapper.map(result, Usuario, UsuarioResponseDto);
    } finally {
      this.dbService.$disconnect();
    }
  }
}
