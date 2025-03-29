import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { QueueItemDto } from '../dto';

@Injectable()
export class QueueItemsService {
    constructor(private readonly prisma: PrismaService) { }

    // Create a new ticket
    async createQueueItem(queueItemDto: QueueItemDto) {
        return this.prisma.queue_items.create({
            data: {
                queueId: queueItemDto.queueId,
                title: queueItemDto.title,
                description: queueItemDto.description,
                priority: queueItemDto.priority,
                status: queueItemDto.status,
                history: queueItemDto.history
            },
        });
    }

    // Get all tickets
    async getQueueItems() {
        return this.prisma.queue_items.findMany();
    }

    // Get a ticket by ID
    async getQueueItemById(id: string) {
        const ticket = await this.prisma.queue_items.findUnique({
            where: { id },
        });
        return ticket;
    }

    // Update a ticket by ID
    async updateQueueItem(id: string, queueItemDto: QueueItemDto) {
        return this.prisma.queue_items.update({
            where: { id },
            data: {
                queueId: queueItemDto.queueId,
                title: queueItemDto.title,
                description: queueItemDto.description,
                priority: queueItemDto.priority,
                status: queueItemDto.status,
                history: queueItemDto.history
            },
        });
    }

    async patchQueueItem(id: string, queueItemDto: Partial<QueueItemDto>) {
        return this.prisma.queue_items.update({
            where: { id },
            data: {
                ...queueItemDto,
            },
        });
    }

    // Delete a ticket by ID
    async deleteQueueItem(id: string) {
        return this.prisma.queue_items.delete({
            where: { id },
        });
    }
}