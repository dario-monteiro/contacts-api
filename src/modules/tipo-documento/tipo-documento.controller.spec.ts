import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TipoDocumentoRequestDto } from './dtos/tipo-documento-request.dto';
import { TipoDocumentoResponseDto } from './dtos/tipo-documento-response.dto';
import { TipoDocumentoController } from './tipo-documento.controller';
import { TipoDocumentoService } from './tipo-documento.service';

class ServiceMock {
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

describe('TipoDocumentoController', () => {
  let controller: TipoDocumentoController;
  let service: TipoDocumentoService;

  beforeAll(async () => {
    const ServiceProvider = {
      provide: TipoDocumentoService,
      useClass: ServiceMock
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoDocumentoController],
      providers: [TipoDocumentoService, ServiceProvider]
    }).compile();

    controller = module.get<TipoDocumentoController>(TipoDocumentoController);
    service = module.get<TipoDocumentoService>(TipoDocumentoService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllTiposDocumento', () => {
    it('should call method', () => {
      const getAllTiposDocumentoSpy = jest.spyOn(controller, 'getAllTiposDocumento');
      controller.getAllTiposDocumento();
      expect(getAllTiposDocumentoSpy).toHaveBeenCalled();
    });

    it('should return a list if successful', async () => {
      const expectedResult: TipoDocumentoResponseDto[] = [];

      jest.spyOn(controller, 'getAllTiposDocumento').mockResolvedValue(expectedResult);

      expect(await controller.getAllTiposDocumento()).toBe(expectedResult);
    });

    it('should return a NotFoundException if TipoDocumento not found', async () => {
      const expectedResult = undefined;
      jest.spyOn(service, 'getAllTiposDocumento').mockResolvedValue(expectedResult);

      try {
        await controller.getAllTiposDocumento();
      } catch (err) {
        expect(err.message).toEqual('Tipos Documento não encontrados');
      }
    });
  });

  describe('getTipoDocumento', () => {
    it('should call method with expected param', () => {
      const getTipoDocumentoSpy = jest.spyOn(controller, 'getTipoDocumento');
      const id = 1208;
      controller.getTipoDocumento(id);
      expect(getTipoDocumentoSpy).toHaveBeenCalledWith(id);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: TipoDocumentoResponseDto = new TipoDocumentoResponseDto();
      const id = 1208;

      jest.spyOn(controller, 'getTipoDocumento').mockResolvedValue(expectedResult);

      expect(await controller.getTipoDocumento(id)).toBe(expectedResult);
    });

    it('should return a NotFoundException if TipoDocumento not found', async () => {
      const id = 1208;
      const expectedResult = undefined;
      jest.spyOn(service, 'getTipoDocumento').mockResolvedValue(expectedResult);

      try {
        await controller.getTipoDocumento(id);
      } catch (err) {
        expect(err.message).toEqual('Tipo Documento não encontrado');
      }
    });
  });

  describe('insertTipoDocumento', () => {
    it('should call method with expected param', () => {
      const insertTipoDocumentoSpy = jest.spyOn(controller, 'insertTipoDocumento');
      const dto = new TipoDocumentoRequestDto();
      controller.insertTipoDocumento(dto);
      expect(insertTipoDocumentoSpy).toHaveBeenCalledWith(dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: TipoDocumentoRequestDto = new TipoDocumentoRequestDto();

      jest.spyOn(controller, 'insertTipoDocumento').mockResolvedValue(expectedResult);

      expect(await controller.insertTipoDocumento(expectedResult)).toBe(expectedResult);
    });

    it('should return a BadRequestException if TipoDocumento.descricao is undefined', async () => {
      const dto: TipoDocumentoRequestDto = new TipoDocumentoRequestDto();
      const error: any = { message: 'Bad Request Exception', code: 400 };
      jest.spyOn(controller, 'insertTipoDocumento').mockRejectedValue(error);
      try {
        await controller.insertTipoDocumento(dto);
      } catch (err) {
        expect(err.message).toEqual('Bad Request Exception');
      }
    });
  });

  describe('updateTipoDocumento', () => {
    it('should call method with expected params', () => {
      const updateTipoDocumentoSpy = jest.spyOn(controller, 'updateTipoDocumento');
      const id = 1208;
      const dto = new TipoDocumentoRequestDto();
      controller.updateTipoDocumento(id, dto);
      expect(updateTipoDocumentoSpy).toHaveBeenCalledWith(id, dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: TipoDocumentoRequestDto = new TipoDocumentoRequestDto();
      const id = 1208;

      jest.spyOn(controller, 'updateTipoDocumento').mockResolvedValue(expectedResult);

      expect(await controller.updateTipoDocumento(id, expectedResult)).toBe(expectedResult);
    });

    it('should return a BadRequestException if TipoDocumento.descricao is undefined', async () => {
      const dto: TipoDocumentoRequestDto = new TipoDocumentoRequestDto();
      const id = 1208;
      const error: any = { message: 'Bad Request Exception', code: 400 };
      jest.spyOn(controller, 'updateTipoDocumento').mockRejectedValue(error);
      try {
        await controller.updateTipoDocumento(id, dto);
      } catch (err) {
        expect(err.message).toEqual('Bad Request Exception');
      }
    });
  });

  describe('deleteTipoDocumento', () => {
    it('should call method with expected param', () => {
      const deleteTipoDocumentoSpy = jest.spyOn(controller, 'deleteTipoDocumento');
      const id = 1208;
      controller.deleteTipoDocumento(id);
      expect(deleteTipoDocumentoSpy).toHaveBeenCalledWith(id);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: TipoDocumentoResponseDto = new TipoDocumentoResponseDto();
      const id = 1208;

      jest.spyOn(controller, 'deleteTipoDocumento').mockResolvedValue(expectedResult);

      expect(await controller.deleteTipoDocumento(id)).toBe(expectedResult);
    });
  });
});
