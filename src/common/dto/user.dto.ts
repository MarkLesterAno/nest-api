
import { IsString, IsBoolean, IsArray ,IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;

    @IsArray()
    roles: string[];
}