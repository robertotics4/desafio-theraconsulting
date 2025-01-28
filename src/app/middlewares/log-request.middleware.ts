import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogRequestMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LogRequestMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const formattedDateSimple = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());

    this.logger.log(`${req.method}: ${req.url} -> ${formattedDateSimple}`);
    next();
  }
}
