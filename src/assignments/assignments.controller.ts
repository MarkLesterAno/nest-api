// filepath: e:\Files\nest\nest-api\src\features\assignments\assignment\assignment.controller.ts
import {
    Controller, Get, Post, Param, Body, Patch, Delete,
    NotFoundException, BadRequestException, Put, UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guard/jwt.guard';
import { AssignmentsService } from './assignments.service';
import { AssignmentDto } from '../dto';

@Controller('assignments')
export class AssignmentsController {
    constructor(private assignmentService: AssignmentsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createAssignment(@Body() assignmentDto: AssignmentDto) {
        try {
            const newAssignment = await this.assignmentService.createAssignment(assignmentDto);
            return newAssignment;
        } catch (error) {
            throw new BadRequestException('Failed to create assignment');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAssignments() {
        try {
            const assignments = await this.assignmentService.getAssignments();
            return assignments;
        } catch (error) {
            throw new BadRequestException('Failed to get assignments');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getAssignmentById(@Param('id') id: string) {
        try {
            const assignment = await this.assignmentService.getAssignmentById(id);
            if (!assignment) {
                throw new NotFoundException(`Assignment with ID ${id} not found`);
            }
            return assignment;
        } catch (error) {
            throw new BadRequestException('Failed to get assignment');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateAssignment(@Param('id') id: string, @Body() assignmentDto: AssignmentDto) {
        try {
            return await this.assignmentService.updateAssignment(id, assignmentDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update assignment');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patchAssignment(@Param('id') id: string, @Body() assignmentDto: Partial<AssignmentDto>) {
        try {
            return await this.assignmentService.patchAssignment(id, assignmentDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update assignment');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteAssignment(@Param('id') id: string) {
        try {
            return await this.assignmentService.deleteAssignment(id);
        } catch (error) {
            throw new NotFoundException(`Assignment with ID ${id} not found`);
        }
    }
}