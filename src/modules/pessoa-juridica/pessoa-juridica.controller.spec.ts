import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaInsertDto } from './dtos/empresa-insert.dto';
import { EmpresaResponseDto } from './dtos/empresa-response.dto';
import { EmpresaUpdateDto } from './dtos/empresa-update.dto';
import { PessoaJuridicaController } from './pessoa-juridica.controller';
import { PessoaJuridicaService } from './pessoa-juridica.service';

class ServiceMock {
  async getAllPessoasJuridicas(): Promise<EmpresaResponseDto[]> {
    return [];
  }
  async getPessoaJuridica(id: number): Promise<EmpresaResponseDto> {
    return new EmpresaResponseDto();
  }
  async insertPessoaJuridica(dto: any): Promise<EmpresaResponseDto> {
    return new EmpresaResponseDto();
  }
  async updatePessoaJuridica(id: number, dto: any): Promise<EmpresaResponseDto> {
    return new EmpresaResponseDto();
  }
  async deletePessoaJuridica(id: number): Promise<EmpresaResponseDto> {
    return new EmpresaResponseDto();
  }
}

describe('PessoaJuridicaController', () => {
  let controller: PessoaJuridicaController;
  let service: PessoaJuridicaService;

  beforeAll(async () => {
    const ServiceProvider = {
      provide: PessoaJuridicaService,
      useClass: ServiceMock
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoaJuridicaController],
      providers: [PessoaJuridicaService, ServiceProvider]
    }).compile();

    controller = module.get<PessoaJuridicaController>(PessoaJuridicaController);
    service = module.get<PessoaJuridicaService>(PessoaJuridicaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllPessoasJuridicas', () => {
    it('should call method', () => {
      const getAllPessoasJuridicasSpy = jest.spyOn(controller, 'getAllPessoasJuridicas');
      controller.getAllPessoasJuridicas();
      expect(getAllPessoasJuridicasSpy).toHaveBeenCalled();
    });

    it('should return a list if successful', async () => {
      const expectedResult: EmpresaResponseDto[] = [];

      jest.spyOn(controller, 'getAllPessoasJuridicas').mockResolvedValue(expectedResult);

      expect(await controller.getAllPessoasJuridicas()).toBe(expectedResult);
    });

    it('should return a NotFoundException if PessoaJuridica not found', async () => {
      const expectedResult = undefined;
      jest.spyOn(service, 'getAllPessoasJuridicas').mockResolvedValue(expectedResult);

      try {
        await controller.getAllPessoasJuridicas();
      } catch (err) {
        expect(err.message).toEqual('Empresas não encontradas');
      }
    });
  });

  describe('getPessoaJuridica', () => {
    it('should call method with expected param', () => {
      const getPessoaJuridicaSpy = jest.spyOn(controller, 'getPessoaJuridica');
      const id = 1208;
      controller.getPessoaJuridica(id);
      expect(getPessoaJuridicaSpy).toHaveBeenCalled();
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: EmpresaResponseDto = new EmpresaResponseDto();
      const id = 1208;

      jest.spyOn(controller, 'getPessoaJuridica').mockResolvedValue(expectedResult);

      expect(await controller.getPessoaJuridica(id)).toBe(expectedResult);
    });

    it('should return a NotFoundException if PessoaJuridica not found', async () => {
      const id = 1208;
      const expectedResult = undefined;
      jest.spyOn(service, 'getPessoaJuridica').mockResolvedValue(expectedResult);

      try {
        await controller.getPessoaJuridica(id);
      } catch (err) {
        expect(err.message).toEqual('Empresa não encontrada');
      }
    });
  });

  describe('insertPessoaJuridica', () => {
    it('should call method with expected param', () => {
      const insertPessoaJuridicaSpy = jest.spyOn(controller, 'insertPessoaJuridica');
      const dto = new EmpresaInsertDto();
      controller.insertPessoaJuridica(dto);
      expect(insertPessoaJuridicaSpy).toHaveBeenCalledWith(dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: EmpresaInsertDto = new EmpresaInsertDto();

      jest.spyOn(controller, 'insertPessoaJuridica').mockResolvedValue(expectedResult);

      expect(await controller.insertPessoaJuridica(expectedResult)).toBe(expectedResult);
    });

    it('should return a BadRequestException if PessoaJuridica.razaoSocial is undefined', async () => {
      const dto: EmpresaInsertDto = new EmpresaInsertDto();
      const error: any = { message: 'Bad Request Exception', code: 400 };
      jest.spyOn(controller, 'insertPessoaJuridica').mockRejectedValue(error);
      try {
        await controller.insertPessoaJuridica(dto);
      } catch (err) {
        expect(err.message).toEqual('Bad Request Exception');
      }
    });
  });

  describe('updatePessoaJuridica', () => {
    it('should call method with expected params', () => {
      const updatePessoaJuridicaSpy = jest.spyOn(controller, 'updatePessoaJuridica');
      const id = 1208;
      const dto = new EmpresaUpdateDto();
      controller.updatePessoaJuridica(id, dto);
      expect(updatePessoaJuridicaSpy).toHaveBeenCalledWith(id, dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: EmpresaUpdateDto = new EmpresaUpdateDto();
      const id = 1208;

      jest.spyOn(controller, 'updatePessoaJuridica').mockResolvedValue(expectedResult);

      expect(await controller.updatePessoaJuridica(id, expectedResult)).toBe(expectedResult);
    });

    it('should return a BadRequestException if PessoaJuridica.razaoSocial is undefined', async () => {
      const dto: EmpresaUpdateDto = new EmpresaUpdateDto();
      const id = 1208;
      const error: any = { message: 'Bad Request Exception', code: 400 };
      jest.spyOn(controller, 'updatePessoaJuridica').mockRejectedValue(error);
      try {
        await controller.updatePessoaJuridica(id, dto);
      } catch (err) {
        expect(err.message).toEqual('Bad Request Exception');
      }
    });
  });

  describe('deletePessoaJuridica', () => {
    it('should call method with expected param', () => {
      const deletePessoaJuridicaSpy = jest.spyOn(controller, 'deletePessoaJuridica');
      const id = 1208;
      controller.deletePessoaJuridica(id);
      expect(deletePessoaJuridicaSpy).toHaveBeenCalledWith(id);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: EmpresaResponseDto = new EmpresaResponseDto();
      const id = 1208;

      jest.spyOn(controller, 'deletePessoaJuridica').mockResolvedValue(expectedResult);

      expect(await controller.deletePessoaJuridica(id)).toBe(expectedResult);
    });
  });
});
