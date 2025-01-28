import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/orders')
@ApiTags('orders')
export class OrderController {
  constructor() {}
}
