import { Test, TestingModule } from '@nestjs/testing';
import { DBPrismaService } from '../../infrastructure/db-infrastructure';
import { PessoaFisicaRepository } from '../../repositories/pessoa-fisica.repository';
import { PessoaInsertDto } from './dtos/pessoa-insert.dto';
import { PessoaResponseDto } from './dtos/pessoa-response.dto';
import { PessoaUpdateDto } from './dtos/pessoa-update.dto';
import { PessoaFisicaService } from './pessoa-fisica.service';
class RepositoryMock {
  getAllPessoasFisicas() {
    return [];
  }
  getPessoaFisica(id: number) {
    return {};
  }
  insertPessoaFisica(dto: any) {
    return {};
  }
  updatePessoaFisica(id: number, dto: any) {
    return {};
  }
  deletePessoaFisica(id: number) {
    return {};
  }
}
describe('PessoaFisicaService', () => {
  let service: PessoaFisicaService;
  let repository: PessoaFisicaRepository;

  beforeAll(async () => {
    const RepositoryProvider = {
      provide: PessoaFisicaRepository,
      useClass: RepositoryMock
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoaFisicaService, PessoaFisicaRepository, DBPrismaService, RepositoryProvider]
    }).compile();

    service = module.get<PessoaFisicaService>(PessoaFisicaService);
    repository = module.get<PessoaFisicaRepository>(PessoaFisicaRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPessoasFisicas', () => {
    it('should call method', async () => {
      const getAllPessoasFisicasSpy = jest.spyOn(service, 'getAllPessoasFisicas');
      service.getAllPessoasFisicas();
      expect(getAllPessoasFisicasSpy).toHaveBeenCalled();
    });

    it('should return a list if successful', async () => {
      const expectedResult: PessoaResponseDto[] = [];

      jest.spyOn(service, 'getAllPessoasFisicas').mockResolvedValue(expectedResult);

      expect(await service.getAllPessoasFisicas()).toBe(expectedResult);
    });
  });

  describe('getPessoaFisica', () => {
    it('should call method with expected param', async () => {
      const getPessoaFisicaSpy = jest.spyOn(service, 'getPessoaFisica');
      const id = 1208;
      service.getPessoaFisica(id);
      expect(getPessoaFisicaSpy).toHaveBeenCalledWith(id);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: PessoaResponseDto = new PessoaResponseDto();
      const id = 1208;

      jest.spyOn(service, 'getPessoaFisica').mockResolvedValue(expectedResult);

      expect(await service.getPessoaFisica(id)).toBe(expectedResult);
    });
  });

  describe('insertPessoaFisica', () => {
    it('should call method with expected param', async () => {
      const insertPessoaFisicaSpy = jest.spyOn(service, 'insertPessoaFisica');
      const dto = new PessoaInsertDto();
      service.insertPessoaFisica(dto);
      expect(insertPessoaFisicaSpy).toHaveBeenCalledWith(dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: PessoaInsertDto = new PessoaInsertDto();

      jest.spyOn(service, 'insertPessoaFisica').mockResolvedValue(expectedResult);

      expect(await service.insertPessoaFisica(expectedResult)).toBe(expectedResult);
    });
  });

  describe('updatePessoaFisica', () => {
    it('should call method with expected params', async () => {
      const updatePessoaFisicaSpy = jest.spyOn(service, 'updatePessoaFisica');
      const id = 1208;
      const dto = new PessoaUpdateDto();
      service.updatePessoaFisica(id, dto);
      expect(updatePessoaFisicaSpy).toHaveBeenCalledWith(id, dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: PessoaUpdateDto = new PessoaUpdateDto();
      const id = 1208;

      jest.spyOn(service, 'updatePessoaFisica').mockResolvedValue(expectedResult);

      expect(await service.updatePessoaFisica(id, expectedResult)).toBe(expectedResult);
    });
  });

  describe('deletePessoaFisica', () => {
    it('should call method with expected param', async () => {
      const deletePessoaFisicaSpy = jest.spyOn(service, 'deletePessoaFisica');
      const id = 1208;
      service.deletePessoaFisica(id);
      expect(deletePessoaFisicaSpy).toHaveBeenCalledWith(id);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: PessoaResponseDto = new PessoaResponseDto();
      const id = 1208;

      jest.spyOn(service, 'deletePessoaFisica').mockResolvedValue(expectedResult);

      expect(await service.deletePessoaFisica(id)).toBe(expectedResult);
    });
  });
});
