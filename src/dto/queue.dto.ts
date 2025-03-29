
import { IsString, IsBoolean, IsArray ,IsEmail, IsNotEmpty } from 'class-validator';

export class QueueDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}