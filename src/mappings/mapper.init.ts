import { createMap, forMember, mapFrom, typeConverter } from '@automapper/core';
import {
  Contatos,
  Endereco,
  PessoaFisica,
  PessoaJuridica,
  Relacionamento,
  TipoDocumento,
  Usuario
} from '../models/model';
import { EnderecoInsertDto } from 'src/modules/dtos/endereco-insert.dto';
import { EnderecoResponseDto } from 'src/modules/dtos/endereco-response.dto';
import { EnderecoUpdateDto } from 'src/modules/dtos/endereco-update.dto';
import { ContatosInsertDto } from 'src/modules/pessoa-fisica/dtos/contatos-insert.dto';
import { ContatosResponseDto } from 'src/modules/pessoa-fisica/dtos/contatos-response.dto';
import { ContatosUpdateDto } from 'src/modules/pessoa-fisica/dtos/contatos-update.dto';
import { PessoaInsertDto } from 'src/modules/pessoa-fisica/dtos/pessoa-insert.dto';
import { PessoaResponseDto } from 'src/modules/pessoa-fisica/dtos/pessoa-response.dto';
import { PessoaUpdateDto } from 'src/modules/pessoa-fisica/dtos/pessoa-update.dto';
import { EmpresaInsertDto } from 'src/modules/pessoa-juridica/dtos/empresa-insert.dto';
import { EmpresaResponseDto } from 'src/modules/pessoa-juridica/dtos/empresa-response.dto';
import { EmpresaUpdateDto } from 'src/modules/pessoa-juridica/dtos/empresa-update.dto';
import { RelacionamentoPessoaDto } from 'src/modules/relacionamento/dtos/relacionamento-pessoa.dto';
import { RelacionamentoRequestDto } from 'src/modules/relacionamento/dtos/relacionamento-request.dto';
import { RelacionamentoResponseDto } from 'src/modules/relacionamento/dtos/relacionamento-response.dto';
import { TipoDocumentoPessoaDto } from 'src/modules/tipo-documento/dtos/tipo-documento-pessoa.dto';
import { TipoDocumentoRequestDto } from 'src/modules/tipo-documento/dtos/tipo-documento-request.dto';
import { TipoDocumentoResponseDto } from 'src/modules/tipo-documento/dtos/tipo-documento-response.dto';
import { UsuarioRequestDto } from 'src/modules/usuario/dtos/usuario-request.dto';
import { UsuarioResponseDto } from 'src/modules/usuario/dtos/usuario-response.dto';
import { Utils } from 'src/utils/utils';
import { mapper } from './mapper';

export class MapperInit {
  static initializeMappers() {
    createMap(
      mapper,
      PessoaInsertDto,
      PessoaFisica,
      typeConverter(String, Date, (date) => Utils.isoDateStringToDate(date)),
      forMember(
        (dest) => dest.contatosId,
        mapFrom((src) => parseInt(src.contatos.id))
      ),
      forMember(
        (dest) => dest.enderecoId,
        mapFrom((src) => parseInt(src.endereco.id))
      ),
      forMember(
        (dest) => dest.pessoaJuridicaId,
        mapFrom((src) => parseInt(src.empresa.id))
      ),
      forMember(
        (dest) => dest.relacionamentoId,
        mapFrom((src) => parseInt(src.relacionamento.id))
      ),
      forMember(
        (dest) => dest.tipoDocumentoId,
        mapFrom((src) => parseInt(src.tipoDocumento.id))
      )
    );
    createMap(
      mapper,
      PessoaUpdateDto,
      PessoaFisica,
      typeConverter(String, Date, (date) => Utils.isoDateStringToDate(date)),
      forMember(
        (dest) => dest.id,
        mapFrom((src) => parseInt(src.id))
      ),
      forMember(
        (dest) => dest.contatosId,
        mapFrom((src) => parseInt(src.contatos.id))
      ),
      forMember(
        (dest) => dest.enderecoId,
        mapFrom((src) => parseInt(src.endereco.id))
      ),
      forMember(
        (dest) => dest.pessoaJuridicaId,
        mapFrom((src) => parseInt(src.empresa.id))
      ),
      forMember(
        (dest) => dest.relacionamentoId,
        mapFrom((src) => parseInt(src.relacionamento.id))
      ),
      forMember(
        (dest) => dest.tipoDocumentoId,
        mapFrom((src) => parseInt(src.tipoDocumento.id))
      )
    );
    createMap(
      mapper,
      PessoaFisica,
      PessoaResponseDto,
      typeConverter(Date, String, (date) => Utils.dateToIsoDateString(date)),
      forMember(
        (dest) => dest.contatos.id,
        mapFrom((src) => src.contatosId.toString())
      ),
      forMember(
        (dest) => dest.endereco.id,
        mapFrom((src) => src.enderecoId.toString())
      ),
      forMember(
        (dest) => dest.empresa.id,
        mapFrom((src) => src.pessoaJuridicaId.toString())
      ),
      forMember(
        (dest) => dest.relacionamento.id,
        mapFrom((src) => src.relacionamentoId.toString())
      ),
      forMember(
        (dest) => dest.tipoDocumento.id,
        mapFrom((src) => src.tipoDocumentoId.toString())
      )
    );
    createMap(
      mapper,
      EmpresaInsertDto,
      PessoaJuridica,
      forMember(
        (dest) => dest.enderecoId,
        mapFrom((src) => parseInt(src.endereco.id))
      )
    );
    createMap(
      mapper,
      EmpresaUpdateDto,
      PessoaJuridica,
      forMember(
        (dest) => dest.id,
        mapFrom((src) => parseInt(src.id))
      ),
      forMember(
        (dest) => dest.enderecoId,
        mapFrom((src) => parseInt(src.endereco.id))
      )
    );
    createMap(
      mapper,
      PessoaJuridica,
      EmpresaResponseDto,
      forMember(
        (dest) => dest.endereco.id,
        mapFrom((src) => src.enderecoId.toString())
      )
    );
    createMap(mapper, ContatosInsertDto, Contatos);
    createMap(
      mapper,
      ContatosUpdateDto,
      Contatos,
      forMember(
        (dest) => dest.id,
        mapFrom((src) => parseInt(src.id))
      )
    );
    createMap(mapper, Contatos, ContatosResponseDto);
    createMap(
      mapper,
      EnderecoInsertDto,
      Endereco,
      forMember(
        (dest) => dest.numero,
        mapFrom((src) => parseInt(src.numero))
      )
    );
    createMap(
      mapper,
      EnderecoUpdateDto,
      Endereco,
      forMember(
        (dest) => dest.id,
        mapFrom((src) => parseInt(src.id))
      ),
      forMember(
        (dest) => dest.numero,
        mapFrom((src) => parseInt(src.numero))
      )
    );
    createMap(
      mapper,
      Endereco,
      EnderecoResponseDto,
      forMember(
        (dest) => dest.id,
        mapFrom((src) => src.id.toString())
      ),
      forMember(
        (dest) => dest.numero,
        mapFrom((src) => src.numero.toString())
      )
    );
    createMap(mapper, RelacionamentoRequestDto, Relacionamento);
    createMap(
      mapper,
      RelacionamentoPessoaDto,
      Relacionamento,
      forMember(
        (dest) => dest.id,
        mapFrom((src) => parseInt(src.id))
      )
    );
    createMap(mapper, Relacionamento, RelacionamentoResponseDto);
    createMap(mapper, TipoDocumentoRequestDto, TipoDocumento);
    createMap(
      mapper,
      TipoDocumentoPessoaDto,
      TipoDocumento,
      forMember(
        (dest) => dest.id,
        mapFrom((src) => parseInt(src.id))
      )
    );
    createMap(mapper, TipoDocumento, TipoDocumentoResponseDto);
    createMap(mapper, UsuarioRequestDto, Usuario);
    createMap(mapper, Usuario, UsuarioResponseDto);
  }
}
