import { Test, TestingModule } from '@nestjs/testing';
import { DBPrismaService } from '../../infrastructure/db-infrastructure';
import { PessoaFisicaRepository } from '../../repositories/pessoa-fisica.repository';
import { PessoaJuridicaRepository } from '../../repositories/pessoa-juridica.repository';
import { PessoaResponseDto } from '../pessoa-fisica/dtos/pessoa-response.dto';
import { EmpresaInsertDto } from './dtos/empresa-insert.dto';
import { EmpresaResponseDto } from './dtos/empresa-response.dto';
import { EmpresaUpdateDto } from './dtos/empresa-update.dto';
import { PessoaJuridicaService } from './pessoa-juridica.service';

class RepositoryMock {
  getAllPessoasJuridicas() {
    return [];
  }
  getPessoaJuridica(id: number) {
    return {};
  }
  insertPessoaJuridica(dto: any) {
    return {};
  }
  updatePessoaJuridica(id: number, dto: any) {
    return {};
  }
  deletePessoaJuridica(id: number) {
    return {};
  }
}

let PfRepositoryMock = {
  getPessoaFisicaByPessoaJuridica: async (id: number): Promise<PessoaResponseDto> => new PessoaResponseDto()
};

describe('PessoaJuridicaService', () => {
  let service: PessoaJuridicaService;
  let repository: PessoaJuridicaRepository;
  let pfRepository: PessoaFisicaRepository;

  beforeAll(async () => {
    const RepositoryProvider = {
      provide: PessoaJuridicaRepository,
      useClass: RepositoryMock
    };
    const PfRepositoryProvider = {
      provide: PessoaFisicaRepository,
      useValue: PfRepositoryMock
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoaJuridicaService,
        PessoaJuridicaRepository,
        PessoaFisicaRepository,
        DBPrismaService,
        RepositoryProvider,
        PfRepositoryProvider
      ]
    }).compile();

    service = module.get<PessoaJuridicaService>(PessoaJuridicaService);
    repository = module.get<PessoaJuridicaRepository>(PessoaJuridicaRepository);
    pfRepository = module.get<PessoaFisicaRepository>(PessoaFisicaRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPessoasJuridicas', () => {
    it('should call method', async () => {
      const getAllPessoasJuridicasSpy = jest.spyOn(service, 'getAllPessoasJuridicas');
      service.getAllPessoasJuridicas();
      expect(getAllPessoasJuridicasSpy).toHaveBeenCalled();
    });

    it('should return a list if successful', async () => {
      const expectedResult: EmpresaResponseDto[] = [];

      jest.spyOn(service, 'getAllPessoasJuridicas').mockResolvedValue(expectedResult);

      expect(await service.getAllPessoasJuridicas()).toBe(expectedResult);
    });
  });

  describe('getPessoaJuridica', () => {
    it('should call method with expected param', async () => {
      const getPessoaJuridicaSpy = jest.spyOn(service, 'getPessoaJuridica');
      const id = 1208;
      service.getPessoaJuridica(id);
      expect(getPessoaJuridicaSpy).toHaveBeenCalledWith(id);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: EmpresaResponseDto = new EmpresaResponseDto();
      const id = 1208;

      jest.spyOn(service, 'getPessoaJuridica').mockResolvedValue(expectedResult);

      expect(await service.getPessoaJuridica(id)).toBe(expectedResult);
    });
  });

  describe('insertPessoaJuridica', () => {
    it('should call method with expected param', async () => {
      const insertPessoaJuridicaSpy = jest.spyOn(service, 'insertPessoaJuridica');
      const dto = new EmpresaInsertDto();
      service.insertPessoaJuridica(dto);
      expect(insertPessoaJuridicaSpy).toHaveBeenCalledWith(dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: EmpresaResponseDto = new EmpresaResponseDto();

      jest.spyOn(service, 'insertPessoaJuridica').mockResolvedValue(expectedResult);

      expect(await service.insertPessoaJuridica(expectedResult)).toBe(expectedResult);
    });
  });

  describe('updatePessoaJuridica', () => {
    it('should call method with expected params', async () => {
      const updatePessoaJuridicaSpy = jest.spyOn(service, 'updatePessoaJuridica');
      const id = 1208;
      const dto = new EmpresaUpdateDto();
      service.updatePessoaJuridica(id, dto);
      expect(updatePessoaJuridicaSpy).toHaveBeenCalledWith(id, dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: EmpresaResponseDto = new EmpresaResponseDto();
      const id = 1208;

      jest.spyOn(service, 'updatePessoaJuridica').mockResolvedValue(expectedResult);

      expect(await service.updatePessoaJuridica(id, expectedResult)).toBe(expectedResult);
    });
  });

  describe('deletePessoaJuridica', () => {
    it('should call method with expected param', async () => {
      pfRepository.getPessoaFisicaByPessoaJuridica = () => undefined;
      const deletePJServSpy = jest.spyOn(service, 'deletePessoaJuridica');
      const id = 1208;

      service.deletePessoaJuridica(id);

      expect(deletePJServSpy).toHaveBeenCalledWith(id);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: EmpresaResponseDto = new EmpresaResponseDto();
      const id = 1208;

      pfRepository.getPessoaFisicaByPessoaJuridica = () => undefined;
      jest.spyOn(service, 'deletePessoaJuridica').mockResolvedValue(expectedResult);

      expect(await service.deletePessoaJuridica(id)).toBe(expectedResult);
    });

    it('should return a Error if PessoaJuridica is used by PessoaFisica', async () => {
      pfRepository.getPessoaFisicaByPessoaJuridica = async () => new PessoaResponseDto();
      const id = 1208;
      try {
        await service.deletePessoaJuridica(id);
      } catch (err) {
        expect(err.message).toEqual('Não é possível deletar uma empresa em uso por uma pessoa');
      }
    });
  });
});
