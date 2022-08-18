import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { RelacionamentoRequestDto } from './dtos/relacionamento-request.dto';
import { RelacionamentoResponseDto } from './dtos/relacionamento-response.dto';
import { RelacionamentoService } from './relacionamento.service';

@Controller('relacionamento')
@ApiTags('Relacionamento')
export class RelacionamentoController {
  /* istanbul ignore next */
  constructor(private readonly service: RelacionamentoService) {}

  @Get()
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Retorna todos os relacionamentos' })
  @ApiOkResponse({ description: 'Todos os Relacionamentos', type: RelacionamentoResponseDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async getAllRelacionamentos(): Promise<RelacionamentoResponseDto[]> {
    const result = await this.service.getAllRelacionamentos();
    if (!result) throw new NotFoundException('Relacionamentos não encontrados');
    return result;
  }

  @Get('/:id')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Retorna um relacionamento' })
  @ApiOkResponse({ description: 'O Relacionamento', type: RelacionamentoResponseDto })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async getRelacionamento(@Param('id') id: number): Promise<RelacionamentoResponseDto> {
    const result = await this.service.getRelacionamento(id);
    if (!result) throw new NotFoundException('Relacionamento não encontrado');
    return result;
  }

  @Post()
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Insere um relacionamento' })
  @ApiCreatedResponse({ description: 'O Relacionamento criado', type: RelacionamentoResponseDto })
  @ApiBadRequestResponse({ description: 'Request inválido' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async insertRelacionamento(
    @Body() relacionamento: RelacionamentoRequestDto
  ): Promise<RelacionamentoResponseDto> {
    return await this.service.insertRelacionamento(relacionamento);
  }

  @Put('/:id')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Atualiza um relacionamento' })
  @ApiOkResponse({ description: 'O Relacionamento atualizado', type: RelacionamentoResponseDto })
  @ApiBadRequestResponse({ description: 'Request inválido' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async updateRelacionamento(
    @Param('id') id: number,
    @Body() relacionamento: RelacionamentoRequestDto
  ): Promise<RelacionamentoResponseDto> {
    return await this.service.updateRelacionamento(id, relacionamento);
  }

  @Delete('/:id')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Remove um relacionamento' })
  @ApiOkResponse({ description: 'Relacionamento removido com sucesso' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async deleteRelacionamento(@Param('id') id: number): Promise<RelacionamentoResponseDto> {
    return await this.service.deleteRelacionamento(id);
  }
}
