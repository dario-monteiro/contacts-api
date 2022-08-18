import { AuthService } from './auth.service';
import { Body, Controller, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { UsuarioRequestDto } from 'src/modules/usuario/dtos/usuario-request.dto';
import { AllowAny } from 'src/customDecorators/allow-any.decorator';

@Controller()
@ApiTags('Autenticação')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth')
  @ApiOperation({ summary: 'Autentica usuário' })
  @ApiOkResponse({ description: 'Token de autenticação' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  @AllowAny()
  async login(@Body() user: UsuarioRequestDto) {
    return this.authService.login(user);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Renova token' })
  @ApiOkResponse({ description: 'Token de autenticação renovado' })
  @ApiBadRequestResponse({ description: 'Token inválido' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  @AllowAny()
  async refreshToken(@Query('token') token: string) {
    return this.authService.refresh(token);
  }
}
