import { Module } from "@nestjs/common";

import { QueueItemsService } from "./queue-item.service";
import { QueueItemsController } from "./queue-item.controller";
import { PrismaService } from "../common/prisma/prisma.service";    

@Module({
    controllers: [QueueItemsController],
    providers: [QueueItemsService, PrismaService],
})
export class QueueItemsModule {}