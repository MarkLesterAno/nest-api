import { UnauthorizedException, NotFoundException, BadRequestException, ForbiddenException, InternalServerErrorException } from "@nestjs/common";
import { max } from "class-validator";

export class AuthUtils {
    static formatError(message: string, statusCode: number) {
        return {
            message: message,
            statusCode: statusCode,
        };
    }

    static errorHandler(error: any) {
        switch (error.statusCode) {
            case 400:
                throw new BadRequestException(error.message);
            case 401:
                throw new UnauthorizedException(error.message);
            case 403:
                throw new ForbiddenException(error.message);
            case 404:
                throw new NotFoundException(error.message);
            case 500:
                throw new InternalServerErrorException(error.message);
            default:
                throw new InternalServerErrorException('An unexpected error occurred');
        }
    }

    static generateCookie(res: any, key: string, value: string, exp: string) {
        const maxAge = this.getExpirationTime(exp);
        res.cookie(key, value, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: maxAge,
        });     
    }

    static getExpirationTime(exp: string): number {
        const timeUnit = exp.slice(-1); 
        const timeValue = parseInt(exp.slice(0, -1), 10);

        if (isNaN(timeValue)) {
            throw new BadRequestException('Invalid expiration format');
        }

        switch (timeUnit) {
            case 'm': // Minutes
                return timeValue * 60 * 1000;
            case 'h': // Hours
                return timeValue * 60 * 60 * 1000;
            case 'd': // Days
                return timeValue * 24 * 60 * 60 * 1000;
            default:
                throw new BadRequestException('Invalid time unit in expiration format');
        }
    }
}