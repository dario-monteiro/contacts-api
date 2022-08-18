import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PessoaResponseDto } from '../src/modules/pessoa-fisica/dtos/pessoa-response.dto';
import { PessoaInsertDto } from '../src/modules/pessoa-fisica/dtos/pessoa-insert.dto';
import { PessoaUpdateDto } from '../src/modules/pessoa-fisica/dtos/pessoa-update.dto';
import { PessoaFisicaModule } from '../src/modules/pessoa-fisica/pessoa-fisica.module';
import { PessoaFisicaService } from '../src/modules/pessoa-fisica/pessoa-fisica.service';
import { Utils } from '../src/utils/utils';

describe('PessoaFisicaController', () => {
  let app: INestApplication;

  let pfService = {
    getAllPessoasFisicas: (): any[] => [],
    getPessoaFisica: (id: number): any => new PessoaResponseDto(),
    insertPessoaFisica: (pessoa: PessoaInsertDto): any => {},
    updatePessoaFisica: (id: number, pessoa: PessoaUpdateDto): any => {},
    deletePessoaFisica: (id: number): any => {}
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [PessoaFisicaModule]
    })
      .overrideProvider(PessoaFisicaService)
      .useValue(pfService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/pessoaFisica (GET) should return OK', () => {
    return request(app.getHttpServer())
      .get('/pessoaFisica')
      .expect(200)
      .expect(pfService.getAllPessoasFisicas());
  });

  it('/pessoaFisica (GET) should return 404 if service return empty response', () => {
    pfService.getAllPessoasFisicas = () => undefined;
    return request(app.getHttpServer()).get('/pessoaFisica').expect(404);
  });

  it('/pessoaFisica/id (GET) should return OK', () => {
    return request(app.getHttpServer())
      .get('/pessoaFisica/1')
      .expect(200)
      .expect({
        ...pfService.getPessoaFisica(1)
      });
  });

  it('/pessoaFisica/id (GET) should return 404 if service return empty response', () => {
    pfService.getPessoaFisica = () => undefined;
    return request(app.getHttpServer()).get('/pessoaFisica/1').expect(404);
  });

  it('/pessoaFisica (POST) should return OK', async () => {
    const body = await Utils.buildObjectFromFile('./data/pessoa-fisica.json');
    return request(app.getHttpServer())
      .post('/pessoaFisica')
      .send(body)
      .expect(201)
      .expect({ ...pfService.insertPessoaFisica(new PessoaInsertDto()) });
  });

  it('/pessoaFisica (POST) should return 400 if send a empty body', async () => {
    return request(app.getHttpServer()).post('/pessoaFisica').send().expect(400);
  });

  it('/pessoaFisica/id (PUT) should return OK', async () => {
    const body = await Utils.buildObjectFromFile('./data/pessoa-fisica.json');
    body.endereco.id = 1;
    body.contatos.id = 1;
    return request(app.getHttpServer())
      .put('/pessoaFisica/1')
      .send(body)
      .expect(200)
      .expect({
        ...pfService.updatePessoaFisica(1, new PessoaInsertDto())
      });
  });

  it('/pessoaFisica/id (PUT) should return 404 if send a empty id', async () => {
    const body = await Utils.buildObjectFromFile('./data/pessoa-fisica.json');
    body.endereco.id = 1;
    body.contatos.id = 1;
    return request(app.getHttpServer()).put('/pessoaFisica').send(body).expect(404);
  });

  it('/pessoaFisica/id (PUT) should return 400 if send a empty body', async () => {
    return request(app.getHttpServer()).put('/pessoaFisica/1').send().expect(400);
  });

  it('/pessoaFisica/id (DEL) should return OK', () => {
    return request(app.getHttpServer())
      .delete('/pessoaFisica/1')
      .expect(200)
      .expect({
        ...pfService.deletePessoaFisica(1)
      });
  });

  it('/pessoaFisica/id (DEL) should return 404 if send a empty id', () => {
    return request(app.getHttpServer()).delete('/pessoaFisica').expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
