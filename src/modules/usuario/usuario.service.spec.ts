import { Test, TestingModule } from '@nestjs/testing';
import { DBPrismaService } from '../../infrastructure/db-infrastructure';
import { UsuarioRepository } from '../../repositories/usuario.repository';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';
import { UsuarioService } from './usuario.service';

let RepositoryMock = {
  getUsuarioByEmail: async (email: string): Promise<UsuarioResponseDto> => new UsuarioResponseDto()
};

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: UsuarioRepository;

  beforeAll(async () => {
    const RepositoryProvider = {
      provide: UsuarioRepository,
      useValue: RepositoryMock
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioService, UsuarioRepository, DBPrismaService, RepositoryProvider]
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<UsuarioRepository>(UsuarioRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call getUsuarioByEmail method with expected param', async () => {
    repository.getUsuarioByEmail = async () => new UsuarioResponseDto();
    const getUsuarioByEmailSpy = jest.spyOn(service, 'getUsuarioByEmail');
    const email = 'joao@hotmail.com';
    service.getUsuarioByEmail(email);
    expect(getUsuarioByEmailSpy).toHaveBeenCalledWith(email);
  });

  it('should getUsuarioByEmail return a response dto if successful', async () => {
    const expectedResult: UsuarioResponseDto = new UsuarioResponseDto();
    expectedResult.id = '1208';
    expectedResult.email = 'joao@hotmail.com';
    expectedResult.senha = '123456';

    const email = 'joao@hotmail.com';

    repository.getUsuarioByEmail = async () => new UsuarioResponseDto();
    jest.spyOn(service, 'getUsuarioByEmail').mockResolvedValue(expectedResult);

    expect(await service.getUsuarioByEmail(email)).toBe(expectedResult);
  });

  it('should getUsuarioByEmail return undefined if e-mail not found', async () => {
    const expectedResult = undefined;

    const email = 'teste@hotmail.com';

    repository.getUsuarioByEmail = () => expectedResult;
    //jest.spyOn(service, 'getUsuarioByEmail').mockResolvedValue(expectedResult);

    expect(await service.getUsuarioByEmail(email)).toBe(expectedResult);
  });
});
