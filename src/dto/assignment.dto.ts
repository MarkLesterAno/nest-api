
import { IsString, IsNotEmpty } from 'class-validator';

export class AssignmentDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    queueId: string;
}