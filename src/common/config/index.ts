import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export default {
    jwtSecret: configService.get<string>('JWT_SECRET'),
    accessTokenExp: configService.get<string>('ACCESS_TOKEN_EXP') || '15m',
    refreshTokenExp: configService.get<string>('REFRESH_TOKEN_EXP') || '7d',
    port: configService.get<number>('PORT'),
};