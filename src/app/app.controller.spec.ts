import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { name, author, version, license } from '../../package.json';
import { ApiInfo, AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return api info', () => {
      const apiInfo: ApiInfo = {
        name,
        author,
        version,
        license,
      };

      expect(appController.getApiInfo()).toEqual(apiInfo);
    });
  });
});
