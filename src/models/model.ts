import { AutoMap } from '@automapper/classes';

/**
 * Model PessoaFisica
 *
 */
export class PessoaFisica {
  @AutoMap()
  id: number;
  @AutoMap()
  nome: string;
  @AutoMap()
  dataNascimento: Date | null;
  @AutoMap()
  documento: string | null;
  @AutoMap()
  cargo: string | null;
  @AutoMap()
  site: string | null;
  contatosId: number;
  tipoDocumentoId: number;
  pessoaJuridicaId: number;
  relacionamentoId: number;
  enderecoId: number;
}

/**
 * Model Contatos
 *
 */
export class Contatos {
  @AutoMap()
  id: number;
  @AutoMap()
  telefoneResidencial: string | null;
  @AutoMap()
  telefoneComercial: string | null;
  @AutoMap()
  celular: string;
  @AutoMap()
  emailPessoal: string | null;
  @AutoMap()
  emailComercial: string | null;
}

/**
 * Model Endereco
 *
 */
export class Endereco {
  @AutoMap()
  id: number;
  @AutoMap()
  logradouro: string;
  @AutoMap()
  numero: number;
  @AutoMap()
  complemento: string | null;
  @AutoMap()
  bairro: string | null;
  @AutoMap()
  cidade: string;
  @AutoMap()
  estado: string;
  @AutoMap()
  pais: string;
  @AutoMap()
  cep: string;
}

/**
 * Model PessoaJuridica
 *
 */
export class PessoaJuridica {
  @AutoMap()
  id: number;
  @AutoMap()
  razaoSocial: string;
  @AutoMap()
  cnpj: string | null;
  @AutoMap()
  site: string | null;
  enderecoId: number;
}

/**
 * Model TipoDocumento
 *
 */
export class TipoDocumento {
  @AutoMap()
  id: number;
  @AutoMap()
  descricao: string;
}

/**
 * Model Relacionamento
 *
 */
export class Relacionamento {
  @AutoMap()
  id: number;
  @AutoMap()
  descricao: string;
}

/**
 * Model Usuario
 *
 */
export class Usuario {
  @AutoMap()
  id: number;
  @AutoMap()
  email: string;
  @AutoMap()
  senha: string;
}
