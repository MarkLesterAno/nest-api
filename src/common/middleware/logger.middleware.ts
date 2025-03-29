import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly loggerService: LoggerService) { }

    use(req: Request, res: Response, next: NextFunction): void {
        const start = Date.now();

        res.on('finish', () => {
            const duration = Date.now() - start;
            const { method, originalUrl } = req;
            const { statusCode } = res;

            // Log the HTTP request details using Winston
            this.loggerService.log(
                `${method} ${originalUrl} ${statusCode} - ${duration}ms`,
            );
        });

        next();
    }
}
