import { Module } from "@nestjs/common";
import { AssignmentsService } from "./assignments.service";
import { AssignmentsController } from "./assignments.controller";
import { PrismaService } from "../common/prisma/prisma.service";

@Module({
    controllers: [AssignmentsController],
    providers: [AssignmentsService, PrismaService],
})
export class AssignmentsModule { }