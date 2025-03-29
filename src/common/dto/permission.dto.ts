
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class PermissionDto {
    @IsEmail()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    contentType: string;
}