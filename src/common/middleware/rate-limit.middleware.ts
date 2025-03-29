import { Injectable, NestMiddleware } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
    private limiter: any;

    constructor() {
        this.limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100, 
            message: 'Too many requests, please try again later.',
            standardHeaders: true, 
            legacyHeaders: false, 
        });
    }

    use(req: Request, res: Response, next: NextFunction) {
        this.limiter(req, res, next);
    }
}