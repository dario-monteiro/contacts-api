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
import { TipoDocumentoRequestDto } from './dtos/tipo-documento-request.dto';
import { TipoDocumentoResponseDto } from './dtos/tipo-documento-response.dto';
import { TipoDocumentoService } from './tipo-documento.service';

@Controller('tipoDocumento')
@ApiTags('Tipo Documento')
export class TipoDocumentoController {
  /* istanbul ignore next */
  constructor(private readonly appService: TipoDocumentoService) {}

  @Get()
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Retorna todos os tipos de documento' })
  @ApiOkResponse({ description: 'Todos os Tipos de Documento', type: TipoDocumentoResponseDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async getAllTiposDocumento(): Promise<TipoDocumentoResponseDto[]> {
    const result = await this.appService.getAllTiposDocumento();
    if (!result) throw new NotFoundException('Tipos Documento não encontrados');
    return result;
  }

  @Get('/:id')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Retorna um tipo de documento' })
  @ApiOkResponse({ description: 'O Tipo de Documento', type: TipoDocumentoResponseDto })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async getTipoDocumento(@Param('id') id: number): Promise<TipoDocumentoResponseDto> {
    const result = await this.appService.getTipoDocumento(id);
    if (!result) throw new NotFoundException('Tipo Documento não encontrado');
    return result;
  }

  @Post()
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Insere um tipo de documento' })
  @ApiCreatedResponse({ description: 'O Tipo de Documento criado', type: TipoDocumentoResponseDto })
  @ApiBadRequestResponse({ description: 'Request inválido' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async insertTipoDocumento(@Body() tipoDocumento: TipoDocumentoRequestDto): Promise<TipoDocumentoResponseDto> {
    return await this.appService.insertTipoDocumento(tipoDocumento);
  }

  @Put('/:id')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Atualiza um tipo de documento' })
  @ApiOkResponse({ description: 'O Tipo de Documento atualizado', type: TipoDocumentoResponseDto })
  @ApiBadRequestResponse({ description: 'Request inválido' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async updateTipoDocumento(
    @Param('id') id: number,
    @Body() tipoDocumento: TipoDocumentoRequestDto
  ): Promise<TipoDocumentoResponseDto> {
    return await this.appService.updateTipoDocumento(id, tipoDocumento);
  }

  @Delete('/:id')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Remove um tipo de documento' })
  @ApiOkResponse({ description: 'Tipo de Documento removido com sucesso' })
  @ApiUnauthorizedResponse({ description: 'Não autorizado' })
  @ApiNotFoundResponse({ description: 'Não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async deleteTipoDocumento(@Param('id') id: number): Promise<TipoDocumentoResponseDto> {
    return await this.appService.deleteTipoDocumento(id);
  }
}
