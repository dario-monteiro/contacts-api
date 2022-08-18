import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { UsuarioRequestDto } from 'src/modules/usuario/dtos/usuario-request.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenProps } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usuarioService.getUsuarioByEmail(email);
    if (user) {
      const passwordTrue = await bcrypt.compare(pass, user.senha);
      if (passwordTrue) {
        const { senha, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: UsuarioRequestDto) {
    const validUser = await this.validateUser(user.email, user.senha);
    if (!validUser) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }
    const payload = { email: validUser.email, sub: validUser.id };
    const tipo = 'Bearer';
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      tipo,
      accessToken: tipo + ' ' + token
    };
  }
  async refresh(token: string) {
    try {
      const tokenDecode = (await this.jwtService.verifyAsync(token)) as TokenProps;
      const payload = { email: tokenDecode.email, sub: tokenDecode.sub };
      const tipo = 'Bearer';
      const newToken = this.jwtService.sign(payload);

      return {
        token: newToken,
        tipo,
        accessToken: tipo + ' ' + newToken
      };
    } catch (error) {
      throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
    }
  }
}
