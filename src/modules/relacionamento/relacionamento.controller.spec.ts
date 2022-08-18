import { Test, TestingModule } from '@nestjs/testing';
import { RelacionamentoRequestDto } from './dtos/relacionamento-request.dto';
import { RelacionamentoResponseDto } from './dtos/relacionamento-response.dto';
import { RelacionamentoController } from './relacionamento.controller';
import { RelacionamentoService } from './relacionamento.service';

class ServiceMock {
  async getAllRelacionamentos(): Promise<RelacionamentoResponseDto[]> {
    return [];
  }
  async getRelacionamento(id: number): Promise<RelacionamentoResponseDto> {
    return new RelacionamentoResponseDto();
  }
  async insertRelacionamento(dto: any): Promise<RelacionamentoResponseDto> {
    return new RelacionamentoResponseDto();
  }
  async updateRelacionamento(id: number, dto: any): Promise<RelacionamentoResponseDto> {
    return new RelacionamentoResponseDto();
  }
  async deleteRelacionamento(id: number): Promise<RelacionamentoResponseDto> {
    return new RelacionamentoResponseDto();
  }
}

describe('RelacionamentoController', () => {
  let controller: RelacionamentoController;
  let service: RelacionamentoService;

  beforeAll(async () => {
    const ServiceProvider = {
      provide: RelacionamentoService,
      useClass: ServiceMock
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelacionamentoController],
      providers: [RelacionamentoService, ServiceProvider]
    }).compile();

    controller = module.get<RelacionamentoController>(RelacionamentoController);
    service = module.get<RelacionamentoService>(RelacionamentoService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllRelacionamentos', () => {
    it('should call method', () => {
      const getAllRelacionamentosSpy = jest.spyOn(controller, 'getAllRelacionamentos');
      controller.getAllRelacionamentos();
      expect(getAllRelacionamentosSpy).toHaveBeenCalled();
    });

    it('should return a list if successful', async () => {
      const expectedResult: RelacionamentoResponseDto[] = [];

      jest.spyOn(controller, 'getAllRelacionamentos').mockResolvedValue(expectedResult);

      expect(await controller.getAllRelacionamentos()).toBe(expectedResult);
    });

    it('should return a NotFoundException if Relacionamento not found', async () => {
      const expectedResult = undefined;
      jest.spyOn(service, 'getAllRelacionamentos').mockResolvedValue(expectedResult);

      try {
        await controller.getAllRelacionamentos();
      } catch (err) {
        expect(err.message).toEqual('Relacionamentos não encontrados');
      }
    });
  });

  describe('getRelacionamento', () => {
    it('should call method with expected param', () => {
      const getRelacionamentoSpy = jest.spyOn(controller, 'getRelacionamento');
      const id = 1208;
      controller.getRelacionamento(id);
      expect(getRelacionamentoSpy).toHaveBeenCalledWith(id);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: RelacionamentoResponseDto = new RelacionamentoResponseDto();
      const id = 1208;

      jest.spyOn(controller, 'getRelacionamento').mockResolvedValue(expectedResult);

      expect(await controller.getRelacionamento(id)).toBe(expectedResult);
    });

    it('should return a NotFoundException if Relacionamento not found', async () => {
      const id = 1208;
      const expectedResult = undefined;
      jest.spyOn(service, 'getRelacionamento').mockResolvedValue(expectedResult);

      try {
        await controller.getRelacionamento(id);
      } catch (err) {
        expect(err.message).toEqual('Tipo Documento não encontrado');
      }
    });
  });

  describe('insertRelacionamento', () => {
    it('should call method with expected param', () => {
      const insertRelacionamentoSpy = jest.spyOn(controller, 'insertRelacionamento');
      const dto = new RelacionamentoRequestDto();
      controller.insertRelacionamento(dto);
      expect(insertRelacionamentoSpy).toHaveBeenCalledWith(dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: RelacionamentoResponseDto = new RelacionamentoResponseDto();

      jest.spyOn(controller, 'insertRelacionamento').mockResolvedValue(expectedResult);

      expect(await controller.insertRelacionamento(expectedResult)).toBe(expectedResult);
    });

    it('should return a BadRequestException if Relacionamento.descricao is undefined', async () => {
      const dto: RelacionamentoRequestDto = new RelacionamentoRequestDto();
      const error: any = { message: 'Bad Request Exception', code: 400 };
      jest.spyOn(controller, 'insertRelacionamento').mockRejectedValue(error);
      try {
        await controller.insertRelacionamento(dto);
      } catch (err) {
        expect(err.message).toEqual('Bad Request Exception');
      }
    });
  });

  describe('updateRelacionamento', () => {
    it('should call method with expected params', () => {
      const updateRelacionamentoSpy = jest.spyOn(controller, 'updateRelacionamento');
      const id = 1208;
      const dto = new RelacionamentoRequestDto();
      controller.updateRelacionamento(id, dto);
      expect(updateRelacionamentoSpy).toHaveBeenCalledWith(id, dto);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: RelacionamentoResponseDto = new RelacionamentoResponseDto();
      const id = 1208;

      jest.spyOn(controller, 'updateRelacionamento').mockResolvedValue(expectedResult);

      expect(await controller.updateRelacionamento(id, expectedResult)).toBe(expectedResult);
    });

    it('should return a BadRequestException if Relacionamento.descricao is undefined', async () => {
      const dto: RelacionamentoRequestDto = new RelacionamentoRequestDto();
      const id = 1208;
      const error: any = { message: 'Bad Request Exception', code: 400 };
      jest.spyOn(controller, 'updateRelacionamento').mockRejectedValue(error);
      try {
        await controller.updateRelacionamento(id, dto);
      } catch (err) {
        expect(err.message).toEqual('Bad Request Exception');
      }
    });
  });

  describe('deleteRelacionamento', () => {
    it('should call method with expected param', () => {
      const deleteRelacionamentoSpy = jest.spyOn(controller, 'deleteRelacionamento');
      const id = 1208;
      controller.deleteRelacionamento(id);
      expect(deleteRelacionamentoSpy).toHaveBeenCalledWith(id);
    });

    it('should return a response dto if successful', async () => {
      const expectedResult: RelacionamentoResponseDto = new RelacionamentoResponseDto();
      const id = 1208;

      jest.spyOn(controller, 'deleteRelacionamento').mockResolvedValue(expectedResult);

      expect(await controller.deleteRelacionamento(id)).toBe(expectedResult);
    });
  });
});
