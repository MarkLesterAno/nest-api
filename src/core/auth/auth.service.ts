// filepath: e:\Files\nest\nest-api\src\core\auth\auth.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '../../common/dto';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import config from 'src/common/config';
import { AuthUtils } from 'src/common/utils/auth.utils';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async login(authDto: AuthDto) {
        try {
            let error: any;

            const user: any = await this.getUser(authDto);
            if (!user) {
                error = AuthUtils.formatError('User not found', 404);
                return { error };
            }

            const isValid: boolean = await argon2.verify(user.password, authDto.password);
            if (!isValid) {
                error = AuthUtils.formatError('Invalid password', 401);
                return { error };
            }

            const payload = { username: user.username, sub: user.id };
            const { access_token, refresh_token } = await this.getTokens(payload);
            return {
                access_token,
                refresh_token
            };

        } catch (error) {
            return { error: AuthUtils.formatError(error.message, 500) };
        }
    }

    async refreshToken(refreshToken: string) {
        try {
            let error: any;

            const decoded = this.jwtService.verify(
                refreshToken, { secret: config.jwtSecret });

            if (!decoded) {
                error = AuthUtils.formatError('Invalid refresh token', 401);
                return { error };
            }

            const payload = { username: decoded.username, sub: decoded.sub };
            const { access_token, refresh_token } = await this.getTokens(payload);
            return {
                access_token,
                refresh_token
            };

        } catch (error) {
            return { error: AuthUtils.formatError(error.message, 500) };
        }
    }

    async getUser(authDto: AuthDto) {
        const user = await this.prisma.users.findFirst({
            where: { OR: [{ username: authDto.username }, { email: authDto.username },], },
        });
        return user;
    }

    async getTokens(payload: any) {
        return {
            access_token: this.generateToken({ payload }),
            refresh_token: this.generateToken({ payload, option: { expiresIn: config.refreshTokenExp } }),
        };
    }
    generateToken({ payload, option }: any) {
        return this.jwtService.sign(payload, {
            secret: config.jwtSecret,
            ...option
        });
    }


}
