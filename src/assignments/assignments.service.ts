import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { AssignmentDto } from '../dto';

@Injectable()
export class AssignmentsService {
    constructor(private prisma: PrismaService) { }

    async createAssignment(assignmentDto: AssignmentDto) {
        const newAssignment = await this.prisma.assignments.create({
            data: {
                userId: assignmentDto.userId,
                queueId: assignmentDto.queueId
            }
        });
        return { newAssignment };
    }

    async getAssignments() {
        return this.prisma.assignments.findMany();
    }

    async getAssignmentById(id: string) {
        return this.prisma.assignments.findUnique({
            where: { id: id },
        });
    }

    async updateAssignment(id: string, assignmentDto: AssignmentDto) {
        return this.prisma.assignments.update({
            where: { id: id },
            data: {
                userId: assignmentDto.userId,
                queueId: assignmentDto.queueId
            }
        });
    }
    
    async patchAssignment(id: string, assignmentDto: Partial<AssignmentDto>) {
        const updatedQueue = this.prisma.assignments.update({
            where: { id: id },
            data: { ...assignmentDto },
        });
        return updatedQueue;
    }

    deleteAssignment(id: string) {
        return this.prisma.assignments.delete({
            where: { id: id },
        });
    }
}