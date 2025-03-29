import {
    Controller, Get, Post, Param, Body, Patch, Delete,
    NotFoundException, BadRequestException, Put, UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guard/jwt.guard';
import { PrioritiesService } from './priorities.service';
import { PriorityDto } from '../dto';

@Controller('priorities')
export class PrioritiesController {
    constructor(private prioritiesService: PrioritiesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPriority(@Body() priorityDto: PriorityDto) {
        try {
            const newPriority = await this.prioritiesService.createPriority(priorityDto);
            return newPriority;
        } catch (error) {
            throw new BadRequestException('Failed to create priority');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getPriorities() {
        try {
            const priorities = await this.prioritiesService.getPriorities();
            return priorities;
        } catch (error) {
            throw new BadRequestException('Failed to get priorities');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getPriorityById(@Param('id') id: string) {
        try {
            const priority = await this.prioritiesService.getPriorityById(id);
            if (!priority) {
                throw new NotFoundException(`Priority with ID ${id} not found`);
            }
            return priority;
        } catch (error) {
            throw new BadRequestException('Failed to get priority');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updatePriority(@Param('id') id: string, @Body() priorityDto: PriorityDto) {
        try {
            return await this.prioritiesService.updatePriority(id, priorityDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update priority');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patchPriority(@Param('id') id: string, @Body() priorityDto: Partial<PriorityDto>) {
        try {
            return await this.prioritiesService.patchPriority(id, priorityDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update priority');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletePriority(@Param('id') id: string) {
        try {
            return await this.prioritiesService.deletePriority(id);
        } catch (error) {
            throw new NotFoundException(`Priority with ID ${id} not found`);
        }
    }
}