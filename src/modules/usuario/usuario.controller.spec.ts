import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let spyService: UsuarioService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UsuarioService,
      useFactory: () => ({})
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [UsuarioService, ApiServiceProvider]
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
    spyService = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
