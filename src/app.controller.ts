import { Controller, Get, Inject, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly clientAuthService: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/auth/')
  async authHello() {
    return this.clientAuthService.send({ cmd: 'hello' }, {});
  }
}
