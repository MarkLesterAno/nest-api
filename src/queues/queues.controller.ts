import {
    Controller, Get, Post, Param, Body, Patch, Delete,
    NotFoundException, BadRequestException, Put, UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guard/jwt.guard';
import { QueuesService } from "./queues.service";
import { QueueDto } from '../dto';

@Controller('queues')
export class QueuesController {
    constructor(private queueService: QueuesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createQueue(@Body() queueDto: QueueDto) {
        try {
            const { newQueue } = await this.queueService.createQueue(queueDto);
            return newQueue;
        } catch (error) {
            throw new BadRequestException('Failed to create queue');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getQueues() {
        try {
            const roles = await this.queueService.getQueues();
            return roles
        } catch (error) {
            throw new BadRequestException('Failed to get queues');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getQueueById(@Param('id') id: string) {
        try {
            const Role = await this.queueService.getQueueById(id);
            if (!Role) {
                throw new NotFoundException(`Queue with ID ${id} not found`);
            }
            return Role;
        } catch (error) {
            throw new BadRequestException('Failed to get queue');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateQueue(@Param('id') id: string, @Body() queueDto: QueueDto) {
        try {
            return await this.queueService.updateQueue(id, queueDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update queue');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patchQueue(@Param('id') id: string, @Body() queueDto: Partial<QueueDto>) {
        try {
            return await this.queueService.patchQueue(id, queueDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update queue');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteQueue(@Param('id') id: string) {
        try {
            return await this.queueService.deleteQueue(id);
        } catch (error) {
            throw new NotFoundException(`Queue with ID ${id} not found`);
        }
    }
} 
