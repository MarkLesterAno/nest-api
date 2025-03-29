// filepath: e:\Files\nest\nest-api\src\features\tickets\ticket.controller.ts
import {
    Controller, Get, Post, Param, Body, Patch, Delete, Put, UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guard/jwt.guard';
import { QueueItemsService } from './queue-item.service';
import { QueueItemDto } from '../dto';

@Controller('queue-items')
export class QueueItemsController {
    constructor(private readonly queueItemService: QueueItemsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTicket(@Body() queueItemDto: QueueItemDto) {
        return this.queueItemService.createQueueItem(queueItemDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getTickets() {
        return this.queueItemService.getQueueItems();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getTicketById(@Param('id') id: string) {
        return this.queueItemService.getQueueItemById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateTicket(@Param('id') id: string, @Body() queueItemDto: QueueItemDto) {
        return this.queueItemService.updateQueueItem(id, queueItemDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async patchTicket(@Param('id') id: string, @Body() queueItemDto: QueueItemDto) {
        return this.queueItemService.patchQueueItem(id, queueItemDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteTicket(@Param('id') id: string) {
        return this.queueItemService.deleteQueueItem(id);
    }
}