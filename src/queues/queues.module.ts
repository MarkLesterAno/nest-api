import { Module } from "@nestjs/common";
import { QueuesService } from "./queues.service";
import { QueuesController } from "./queues.controller";
import { PrismaService } from "../common/prisma/prisma.service";

@Module({
    controllers: [QueuesController],
    providers: [QueuesService, PrismaService],
})
export class QueuesModule { }