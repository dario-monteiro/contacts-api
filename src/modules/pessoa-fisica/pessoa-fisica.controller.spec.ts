import { Test, TestingModule } from '@nestjs/testing';
import { PessoaInsertDto } from './dtos/pessoa-insert.dto';
import { PessoaResponseDto } from './dtos/pessoa-response.dto';
import { PessoaUpdateDto } from './dtos/pessoa-update.dto';
import { PessoaFisicaController } from './pessoa-fisica.controller';
import { PessoaFisicaService } from './pessoa-fisica.service';

class ServiceMock {
  async getAllPessoasFisicas(): Promise<PessoaResponseDto[]> {
    return [];
  }
  async getPessoaFisica(id: number): Promise<PessoaResponseDto> {
    return new PessoaResponseDto();
  }
  async insertPessoaFisica(dto: any): Promise<PessoaResponseDto> {
    return new PessoaResponseDto();
  }
  async updatePessoaFisica(id: number, dto: any): Promise<PessoaResponseDto> {
    return new PessoaResponseDto();
  }
  async deletePessoaFisica(id: number): Promise<PessoaResponseDto> {
    return new PessoaResponseDto();
  }
}

describe('PessoaFisicaController', () => {
  let controller: PessoaFisicaController;
  let service: PessoaFisicaService;

  beforeAll(async () => {
    const ServiceProvider = {
      provide: PessoaFisicaService,
      useClass: ServiceMock
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PessoaFisicaController],
      providers: [PessoaFisicaService, ServiceProvider]
    }).compile();

    controller = module.get<PessoaFisicaController>(PessoaFisicaController);
    service = module.get<PessoaFisicaService>(PessoaFisicaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllPessoasFisicas', () => {
    it('should call method', () => {
      const getAllPessoasFisicasSpy = jest.spyOn(controller, 'getAllPessoasFisicas');
      controller.getAllPessoasFisicas();
      expect(getAllPessoasFisicasSpy).toHaveBeenCalled();
    });

    it('should return a list if successful', async () => {
      const expectedResult: PessoaResponseDto[] = [];

      jest.spyOn(controller, 'getAllPessoasFisicas').mockResolvedValue(expectedResult);

      expect(await controller.getAllPessoasFisicas()).toBe(expectedResult);
    });

    it('should return a NotFoundException if PessoaFisica not found', async () => {
      const expectedResult = undefined;
      jest.spyOn(service, 'getAllPessoasFisicas').mockResolvedValue(expectedResult);
      try {
        await controller.getAllPessoasFisicas();
      } catch (err) {
        expect(err.message).toEqual('Pessoas não encontradas');
      }
    });
  });

  describe('getPessoaFisica', () => {
    it('should call method with expected param', () => {
      const getPessoaFisicaSpy = jest.spyOn(controller, 'getPessoaFisica');
      const id = 1208;
      controller.getPessoaFisica(id);
      expect(getPessoaFisicaSpy).toHaveBeenCalled();
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: PessoaResponseDto = new PessoaResponseDto();
      const id = 1208;

      jest.spyOn(controller, 'getPessoaFisica').mockResolvedValue(expectedResult);

      expect(await controller.getPessoaFisica(id)).toBe(expectedResult);
    });

    it('should return a NotFoundException if PessoaFisica not found', async () => {
      const id = 1208;
      const expectedResult = undefined;
      jest.spyOn(service, 'getPessoaFisica').mockResolvedValue(expectedResult);

      try {
        await controller.getPessoaFisica(id);
      } catch (err) {
        expect(err.message).toEqual('Pessoa não encontrada');
      }
    });
  });

  describe('insertPessoaFisica', () => {
    it('should call method with expected param', () => {
      const insertPessoaFisicaSpy = jest.spyOn(controller, 'insertPessoaFisica');
      const dto = new PessoaInsertDto();
      controller.insertPessoaFisica(dto);
      expect(insertPessoaFisicaSpy).toHaveBeenCalledWith(dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: PessoaInsertDto = new PessoaInsertDto();

      jest.spyOn(controller, 'insertPessoaFisica').mockResolvedValue(expectedResult);

      expect(await controller.insertPessoaFisica(expectedResult)).toBe(expectedResult);
    });

    it('should return a BadRequestException if PessoaFisica.nome is undefined', async () => {
      const dto: PessoaInsertDto = new PessoaInsertDto();
      const error: any = { message: 'Bad Request Exception', code: 400 };
      jest.spyOn(controller, 'insertPessoaFisica').mockRejectedValue(error);
      try {
        await controller.insertPessoaFisica(dto);
      } catch (err) {
        expect(err.message).toEqual('Bad Request Exception');
      }
    });
  });

  describe('updatePessoaFisica', () => {
    it('should call method with expected params', () => {
      const updatePessoaFisicaSpy = jest.spyOn(controller, 'updatePessoaFisica');
      const id = 1208;
      const dto = new PessoaUpdateDto();
      controller.updatePessoaFisica(id, dto);
      expect(updatePessoaFisicaSpy).toHaveBeenCalledWith(id, dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: PessoaUpdateDto = new PessoaUpdateDto();
      const id = 1208;

      jest.spyOn(controller, 'updatePessoaFisica').mockResolvedValue(expectedResult);

      expect(await controller.updatePessoaFisica(id, expectedResult)).toBe(expectedResult);
    });

    it('should return a BadRequestException if PessoaFisica.nome is undefined', async () => {
      const dto: PessoaUpdateDto = new PessoaUpdateDto();
      const id = 1208;
      const error: any = { message: 'Bad Request Exception', code: 400 };
      jest.spyOn(controller, 'updatePessoaFisica').mockRejectedValue(error);
      try {
        await controller.updatePessoaFisica(id, dto);
      } catch (err) {
        expect(err.message).toEqual('Bad Request Exception');
      }
    });
  });

  describe('deletePessoaFisica', () => {
    it('should call method with expected param', () => {
      const deletePessoaFisicaSpy = jest.spyOn(controller, 'deletePessoaFisica');
      const id = 1208;
      controller.deletePessoaFisica(id);
      expect(deletePessoaFisicaSpy).toHaveBeenCalledWith(id);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: PessoaResponseDto = new PessoaResponseDto();
      const id = 1208;

      jest.spyOn(controller, 'deletePessoaFisica').mockResolvedValue(expectedResult);

      expect(await controller.deletePessoaFisica(id)).toBe(expectedResult);
    });
  });
});
