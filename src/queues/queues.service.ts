import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { QueueDto } from '../dto/queue.dto';

@Injectable()
export class QueuesService {
    constructor(private prisma: PrismaService) { }

    async createQueue(queueDto: QueueDto) {
        const newQueue = await this.prisma.queues.create({
            data: {
                name: queueDto.name,
                description: queueDto.description
            }
        });
        return { newQueue };
    }

    async getQueues() {
        return this.prisma.queues.findMany();
    }

    async getQueueById(id: string) {
        return this.prisma.queues.findUnique({
            where: { id: id },
        });
    }

    async updateQueue(id: string, queueDto: QueueDto) {
        return this.prisma.queues.update({
            where: { id: id },
            data: {
                name: queueDto.name,
                description: queueDto.description
            }
        });
    }
    
    async patchQueue(id: string, queueDto: Partial<QueueDto>) {
        const updatedQueue = this.prisma.queues.update({
            where: { id: id },
            data: { ...queueDto },
        });
        return updatedQueue;
    }

    deleteQueue(id: string) {
        return this.prisma.queues.delete({
            where: { id: id },
        });
    }
}