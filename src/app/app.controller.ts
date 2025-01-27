import { Controller, Get } from '@nestjs/common';
import { ApiInfo, AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getApiInfo(): ApiInfo {
    return this.appService.getApiInfo();
  }
}
