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
import { PessoaInsertDto } from './dtos/pessoa-insert.dto';
import { PessoaResponseDto } from './dtos/pessoa-response.dto';
import { PessoaUpdateDto } from './dtos/pessoa-update.dto';
import { PessoaFisicaService } from './pessoa-fisica.service';

@Controller('pessoaFisica')
@ApiTags('Pessoa Física')
export class PessoaFisicaController {
  /* istanbul ignore next */
  constructor(private readonly service: PessoaFisicaService) {}

  @Get()
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Retorna todas as pessoas físicas' })
  @ApiOkResponse({ description: 'Todos as pessoas físicas', type: PessoaResponseDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async getAllPessoasFisicas(): Promise<PessoaResponseDto[]> {
    const result = await this.service.getAllPessoasFisicas();
    if (!result) throw new NotFoundException('Pessoas não encontradas');
    return result;
  }

  @Get('/:id')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Retorna uma pessoa física' })
  @ApiOkResponse({ description: 'A pessoa física', type: PessoaResponseDto })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async getPessoaFisica(@Param('id') id: number): Promise<PessoaResponseDto> {
    const result = await this.service.getPessoaFisica(id);
    if (!result) throw new NotFoundException('Pessoa não encontrada');
    return result;
  }

  @Post()
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Insere uma pessoa física' })
  @ApiCreatedResponse({ description: 'A pessoa física criada', type: PessoaResponseDto })
  @ApiBadRequestResponse({ description: 'Request inválido' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async insertPessoaFisica(@Body() pessoa: PessoaInsertDto): Promise<PessoaResponseDto> {
    return await this.service.insertPessoaFisica(pessoa);
  }

  @Put('/:id')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Atualiza uma pessoa física' })
  @ApiOkResponse({ description: 'A pessoa física atualizada', type: PessoaResponseDto })
  @ApiBadRequestResponse({ description: 'Request inválido' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async updatePessoaFisica(
    @Param('id') id: number,
    @Body() pessoa: PessoaUpdateDto
  ): Promise<PessoaResponseDto> {
    return await this.service.updatePessoaFisica(id, pessoa);
  }

  @Delete('/:id')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Remove uma pessoa física' })
  @ApiOkResponse({ description: 'Pessoa física removida com sucesso' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async deletePessoaFisica(@Param('id') id: number): Promise<PessoaResponseDto> {
    return await this.service.deletePessoaFisica(id);
  }
}
