import { Controller, Res, Req, Get, Post, Param, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from '../../common/dto/auth.dto';
import { AuthUtils } from '../../common/utils/auth.utils';
import config from 'src/common/config';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() authDto: AuthDto, @Res() res: Response) {
        const { access_token, refresh_token }:any = await this.authService.login(authDto);
        const accessTokenExp = config.accessTokenExp;
        const refreshTokenExp = config.refreshTokenExp;

        // Set cookies for access and refresh tokens
        AuthUtils.generateCookie(res, 'access_token', access_token, accessTokenExp);
        AuthUtils.generateCookie(res, 'refresh_token', refresh_token, refreshTokenExp);

        return res.status(200).json({ message: 'User logged in successfully' });
    }

    @Post('refresh-token')
    async refreshToken(
        @Req() req: Request,
        @Res() res: Response
    ) {
        if (!req.cookies.refresh_token) return AuthUtils.errorHandler({
            statusCode: 404, message: 'Refresh token not found'
        }); 
        const token = req.cookies.refresh_token;
        const { access_token, refresh_token, error }: any = await this.authService.refreshToken(token);
        if (error) return AuthUtils.errorHandler(error);

        const accessTokenExp = config.accessTokenExp;
        const refreshTokenExp = config.refreshTokenExp;

        // Update cookies with new tokens
        AuthUtils.generateCookie(res, 'access_token', access_token, accessTokenExp);
        AuthUtils.generateCookie(res, 'refresh_token', refresh_token, refreshTokenExp);

        return res.status(200).json({ message: 'Token refreshed successfully' });
    }
}


