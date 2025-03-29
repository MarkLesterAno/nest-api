
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RolePermissionDto {
    @IsEmail()
    @IsNotEmpty()
    roleId: string;

    @IsString()
    @IsNotEmpty()
    permissionId: string;
}