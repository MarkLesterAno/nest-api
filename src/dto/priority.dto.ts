
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class PriorityDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    level: number;
}