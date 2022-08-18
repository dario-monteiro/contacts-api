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
import { EmpresaInsertDto } from './dtos/empresa-insert.dto';
import { EmpresaResponseDto } from './dtos/empresa-response.dto';
import { EmpresaUpdateDto } from './dtos/empresa-update.dto';
import { PessoaJuridicaService } from './pessoa-juridica.service';

@Controller('pessoaJuridica')
@ApiTags('Pessoa Jurídica')
export class PessoaJuridicaController {
  /* istanbul ignore next */
  constructor(private readonly service: PessoaJuridicaService) {}

  @Get()
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Retorna todas as pessoas jurídicas' })
  @ApiOkResponse({ description: 'Todos as pessoas jurídicas', type: EmpresaResponseDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async getAllPessoasJuridicas(): Promise<EmpresaResponseDto[]> {
    const result = await this.service.getAllPessoasJuridicas();
    if (!result) throw new NotFoundException('Empresas não encontradas');
    return result;
  }

  @Get('/:id')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Retorna uma pessoa jurídica' })
  @ApiOkResponse({ description: 'A pessoa jurídica', type: EmpresaResponseDto })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async getPessoaJuridica(@Param('id') id: number): Promise<EmpresaResponseDto> {
    const result = await this.service.getPessoaJuridica(id);
    if (!result) throw new NotFoundException('Empresa não encontrada');
    return result;
  }

  @Post()
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Insere uma pessoa jurídica' })
  @ApiCreatedResponse({ description: 'A pessoa jurídica criada', type: EmpresaResponseDto })
  @ApiBadRequestResponse({ description: 'Request inválido' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async insertPessoaJuridica(@Body() empresa: EmpresaInsertDto): Promise<EmpresaResponseDto> {
    return await this.service.insertPessoaJuridica(empresa);
  }

  @Put('/:id')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Atualiza uma pessoa jurídica' })
  @ApiOkResponse({ description: 'A pessoa jurídica atualizada', type: EmpresaResponseDto })
  @ApiBadRequestResponse({ description: 'Request inválido' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async updatePessoaJuridica(
    @Param('id') id: number,
    @Body() empresa: EmpresaUpdateDto
  ): Promise<EmpresaResponseDto> {
    return await this.service.updatePessoaJuridica(id, empresa);
  }

  @Delete('/:id')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Remove uma pessoa jurídica' })
  @ApiOkResponse({ description: 'Pessoa jurídica removida com sucesso' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async deletePessoaJuridica(@Param('id') id: number): Promise<EmpresaResponseDto> {
    return await this.service.deletePessoaJuridica(id);
  }
}
