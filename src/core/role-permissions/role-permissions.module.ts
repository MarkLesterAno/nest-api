import { Module } from "@nestjs/common";
import { RolePermissionsService } from "./role-permissions.service";
import { RolePermissionsController } from "./role-permissions.controller";
import { PrismaService } from "../../common/prisma/prisma.service";

@Module({
    controllers: [RolePermissionsController],
    providers: [RolePermissionsService, PrismaService],
})
export class RolePermissionsModule { }