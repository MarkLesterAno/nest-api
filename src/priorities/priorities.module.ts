import { Module } from "@nestjs/common";
import { PrioritiesService } from "./priorities.service";
import { PrioritiesController } from "./priorities.controller";
import { PrismaService } from "../common/prisma/prisma.service";

@Module({
    controllers: [PrioritiesController],
    providers: [PrioritiesService, PrismaService],
})
export class PrioritiesModule {}