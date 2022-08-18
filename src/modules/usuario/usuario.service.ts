import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../../repositories/usuario.repository';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';

@Injectable()
export class UsuarioService {
  /* istanbul ignore next */
  constructor(private readonly repository: UsuarioRepository) {}

  async getUsuarioByEmail(email: string): Promise<UsuarioResponseDto> {
    return await this.repository.getUsuarioByEmail(email);
  }
}
