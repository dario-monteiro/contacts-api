import { Test, TestingModule } from '@nestjs/testing';
import { PessoaFisicaRepository } from '../../repositories/pessoa-fisica.repository';
import { DBPrismaService } from '../../infrastructure/db-infrastructure';
import { RelacionamentoRepository } from '../../repositories/relacionamento.repository';
import { PessoaResponseDto } from '../pessoa-fisica/dtos/pessoa-response.dto';
import { RelacionamentoRequestDto } from './dtos/relacionamento-request.dto';
import { RelacionamentoService } from './relacionamento.service';
import { RelacionamentoResponseDto } from './dtos/relacionamento-response.dto';

class RepositoryMock {
  getAllRelacionamentos() {
    return [];
  }
  getRelacionamento(id: number) {
    return {};
  }
  insertRelacionamento(dto: any) {
    return {};
  }
  updateRelacionamento(id: number, dto: any) {
    return {};
  }
  deleteRelacionamento(id: number) {
    return {};
  }
}

let PfRepositoryMock = {
  getPessoaFisicaByRelacionamento: async (id: number): Promise<PessoaResponseDto> => new PessoaResponseDto()
};

describe('RelacionamentoService', () => {
  let service: RelacionamentoService;
  let repository: RelacionamentoRepository;
  let pfRepository: PessoaFisicaRepository;

  beforeAll(async () => {
    const RepositoryProvider = {
      provide: RelacionamentoRepository,
      useClass: RepositoryMock
    };
    const PfRepositoryProvider = {
      provide: PessoaFisicaRepository,
      useValue: PfRepositoryMock
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelacionamentoService,
        RelacionamentoRepository,
        PessoaFisicaRepository,
        DBPrismaService,
        RepositoryProvider,
        PfRepositoryProvider
      ]
    }).compile();

    service = module.get<RelacionamentoService>(RelacionamentoService);
    repository = module.get<RelacionamentoRepository>(RelacionamentoRepository);
    pfRepository = module.get<PessoaFisicaRepository>(PessoaFisicaRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllRelacionamentos', () => {
    it('should call method', async () => {
      const getAllRelacionamentosSpy = jest.spyOn(service, 'getAllRelacionamentos');
      service.getAllRelacionamentos();
      expect(getAllRelacionamentosSpy).toHaveBeenCalled();
    });

    it('should return a list if successful', async () => {
      const expectedResult: RelacionamentoResponseDto[] = [];

      jest.spyOn(service, 'getAllRelacionamentos').mockResolvedValue(expectedResult);

      expect(await service.getAllRelacionamentos()).toBe(expectedResult);
    });
  });

  describe('getRelacionamento', () => {
    it('should call method with expected param', async () => {
      const getRelacionamentoSpy = jest.spyOn(service, 'getRelacionamento');
      const id = 1208;
      service.getRelacionamento(id);
      expect(getRelacionamentoSpy).toHaveBeenCalledWith(id);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: RelacionamentoResponseDto = new RelacionamentoResponseDto();
      const id = 1208;

      jest.spyOn(service, 'getRelacionamento').mockResolvedValue(expectedResult);

      expect(await service.getRelacionamento(id)).toBe(expectedResult);
    });
  });

  describe('insertRelacionamento', () => {
    it('should call method with expected param', async () => {
      const insertRelacionamentoSpy = jest.spyOn(service, 'insertRelacionamento');
      const dto = new RelacionamentoRequestDto();
      service.insertRelacionamento(dto);
      expect(insertRelacionamentoSpy).toHaveBeenCalledWith(dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: RelacionamentoResponseDto = new RelacionamentoResponseDto();

      jest.spyOn(service, 'insertRelacionamento').mockResolvedValue(expectedResult);

      expect(await service.insertRelacionamento(expectedResult)).toBe(expectedResult);
    });
  });

  describe('updateRelacionamento', () => {
    it('should call method with expected params', async () => {
      const updateRelacionamentoSpy = jest.spyOn(service, 'updateRelacionamento');
      const id = 1208;
      const dto = new RelacionamentoRequestDto();
      service.updateRelacionamento(id, dto);
      expect(updateRelacionamentoSpy).toHaveBeenCalledWith(id, dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: RelacionamentoResponseDto = new RelacionamentoResponseDto();
      const id = 1208;

      jest.spyOn(service, 'updateRelacionamento').mockResolvedValue(expectedResult);

      expect(await service.updateRelacionamento(id, expectedResult)).toBe(expectedResult);
    });
  });

  describe('deleteRelacionamento', () => {
    it('should call method with expected param', async () => {
      pfRepository.getPessoaFisicaByRelacionamento = () => undefined;
      const deleteRelacionamentoSpy = jest.spyOn(service, 'deleteRelacionamento');

      const id = 1208;
      service.deleteRelacionamento(id);
      expect(deleteRelacionamentoSpy).toHaveBeenCalledWith(id);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: RelacionamentoResponseDto = new RelacionamentoResponseDto();
      const id = 1208;

      pfRepository.getPessoaFisicaByRelacionamento = () => undefined;
      jest.spyOn(service, 'deleteRelacionamento').mockResolvedValue(expectedResult);

      expect(await service.deleteRelacionamento(id)).toBe(expectedResult);
    });

    it('should return a Error if Relacionamento is used by PessoaFisica', async () => {
      pfRepository.getPessoaFisicaByRelacionamento = async () => new PessoaResponseDto();
      const id = 1208;
      try {
        await service.deleteRelacionamento(id);
      } catch (err) {
        expect(err.message).toEqual('Não é possível deletar um relacionamento em uso por uma pessoa');
      }
    });
  });
});
