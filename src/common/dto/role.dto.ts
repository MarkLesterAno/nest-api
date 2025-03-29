
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RoleDto {
    @IsEmail()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}