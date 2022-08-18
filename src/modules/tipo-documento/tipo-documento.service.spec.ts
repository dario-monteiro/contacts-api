import { Test, TestingModule } from '@nestjs/testing';
import { DBPrismaService } from '../../infrastructure/db-infrastructure';
import { PessoaFisicaRepository } from '../../repositories/pessoa-fisica.repository';
import { TipoDocumentoRepository } from '../../repositories/tipo-documento.repository';
import { PessoaResponseDto } from '../pessoa-fisica/dtos/pessoa-response.dto';
import { TipoDocumentoRequestDto } from './dtos/tipo-documento-request.dto';
import { TipoDocumentoResponseDto } from './dtos/tipo-documento-response.dto';
import { TipoDocumentoService } from './tipo-documento.service';

class RepositoryMock {
  async getAllTiposDocumento(): Promise<TipoDocumentoResponseDto[]> {
    return [];
  }
  async getTipoDocumento(id: number): Promise<TipoDocumentoResponseDto> {
    return new TipoDocumentoResponseDto();
  }
  async insertTipoDocumento(dto: any): Promise<TipoDocumentoResponseDto> {
    return new TipoDocumentoResponseDto();
  }
  async updateTipoDocumento(id: number, dto: any): Promise<TipoDocumentoResponseDto> {
    return new TipoDocumentoResponseDto();
  }
  async deleteTipoDocumento(id: number): Promise<TipoDocumentoResponseDto> {
    return new TipoDocumentoResponseDto();
  }
}

let PfRepositoryMock = {
  getPessoaFisicaByTipoDocumento: async (id: number): Promise<PessoaResponseDto> => new PessoaResponseDto()
};

describe('TipoDocumentoService', () => {
  let service: TipoDocumentoService;
  let repository: TipoDocumentoRepository;
  let pfRepository: PessoaFisicaRepository;

  beforeAll(async () => {
    const RepositoryProvider = {
      provide: TipoDocumentoRepository,
      useClass: RepositoryMock
    };
    const PfRepositoryProvider = {
      provide: PessoaFisicaRepository,
      useValue: PfRepositoryMock
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipoDocumentoService,
        TipoDocumentoRepository,
        PessoaFisicaRepository,
        DBPrismaService,
        RepositoryProvider,
        PfRepositoryProvider
      ]
    }).compile();
    service = module.get<TipoDocumentoService>(TipoDocumentoService);
    repository = module.get<TipoDocumentoRepository>(TipoDocumentoRepository);
    pfRepository = module.get<PessoaFisicaRepository>(PessoaFisicaRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTiposDocumento', () => {
    it('should call method', async () => {
      const getAllTiposDocumentoSpy = jest.spyOn(service, 'getAllTiposDocumento');

      service.getAllTiposDocumento();

      expect(getAllTiposDocumentoSpy).toHaveBeenCalled();
    });

    it('should return a list if successful', async () => {
      const expectedResult: TipoDocumentoResponseDto[] = [];

      jest.spyOn(service, 'getAllTiposDocumento').mockResolvedValue(expectedResult);

      expect(await service.getAllTiposDocumento()).toBe(expectedResult);
    });
  });

  describe('getTipoDocumento', () => {
    it('should call method with expected param', async () => {
      const getTipoDocumentoSpy = jest.spyOn(service, 'getTipoDocumento');
      const id = 1208;

      service.getTipoDocumento(id);

      expect(getTipoDocumentoSpy).toHaveBeenCalledWith(id);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: TipoDocumentoResponseDto = new TipoDocumentoResponseDto();
      const id = 1208;

      jest.spyOn(service, 'getTipoDocumento').mockResolvedValue(expectedResult);

      expect(await service.getTipoDocumento(id)).toBe(expectedResult);
    });
  });

  describe('insertTipoDocumento', () => {
    it('should call method with expected param', async () => {
      const insertTipoDocumentoSpy = jest.spyOn(service, 'insertTipoDocumento');
      const dto = new TipoDocumentoRequestDto();

      service.insertTipoDocumento(dto);

      expect(insertTipoDocumentoSpy).toHaveBeenCalledWith(dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: TipoDocumentoResponseDto = new TipoDocumentoResponseDto();

      jest.spyOn(service, 'insertTipoDocumento').mockResolvedValue(expectedResult);

      expect(await service.insertTipoDocumento(expectedResult)).toBe(expectedResult);
    });
  });

  describe('updateTipoDocumento', () => {
    it('should call method with expected params', async () => {
      const updateTipoDocumentoSpy = jest.spyOn(service, 'updateTipoDocumento');
      const id = 1208;
      const dto = new TipoDocumentoRequestDto();

      service.updateTipoDocumento(id, dto);

      expect(updateTipoDocumentoSpy).toHaveBeenCalledWith(id, dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: TipoDocumentoResponseDto = new TipoDocumentoResponseDto();
      const id = 1208;

      jest.spyOn(service, 'updateTipoDocumento').mockResolvedValue(expectedResult);

      expect(await service.updateTipoDocumento(id, expectedResult)).toBe(expectedResult);
    });
  });

  describe('deleteTipoDocumento', () => {
    it('should call method with expected param', async () => {
      pfRepository.getPessoaFisicaByTipoDocumento = () => undefined;
      const deleteTipoDocumentoSpy = jest.spyOn(service, 'deleteTipoDocumento');

      const id = 1208;

      service.deleteTipoDocumento(id);

      expect(deleteTipoDocumentoSpy).toHaveBeenCalledWith(id);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: TipoDocumentoResponseDto = new TipoDocumentoResponseDto();
      const id = 1208;

      pfRepository.getPessoaFisicaByTipoDocumento = () => undefined;
      jest.spyOn(service, 'deleteTipoDocumento').mockResolvedValue(expectedResult);

      expect(await service.deleteTipoDocumento(id)).toBe(expectedResult);
    });

    it('should return a Error if TipoDocumento is used by PessoaFisica', async () => {
      pfRepository.getPessoaFisicaByTipoDocumento = async () => new PessoaResponseDto();
      const id = 1208;
      try {
        await service.deleteTipoDocumento(id);
      } catch (err) {
        expect(err.message).toEqual('Não é possível deletar um tipo documento em uso por uma pessoa');
      }
    });
  });
});
