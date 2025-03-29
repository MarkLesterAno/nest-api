import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RolePermissionDto } from '../../common/dto';
@Injectable()
export class RolePermissionsService {
    constructor(private prisma: PrismaService) { }

    async createRolePermission(rpDto: RolePermissionDto) {
        const newRolePermission = await this.prisma.role_permissions.create({
            data: {
                roleId: rpDto.roleId,
                permissionId: rpDto.permissionId,
            },
        })
        return { newRolePermission };
    }

    async getRolePermissions() {
        return this.prisma.role_permissions.findMany();
    }

    async getRolePermissionById(id: string) {
        return this.prisma.role_permissions.findUnique({
            where: { id: id },
        });
    }

    async updateRolePermission(id: string, rpDto: RolePermissionDto) {
        return this.prisma.role_permissions.update({
            where: { id: id },
            data: {
                roleId: rpDto.roleId,
                permissionId: rpDto.permissionId,
            },
        });
    }

    async patchRolePermission(id: string, rpDto: Partial<RolePermissionDto>) {
        const updatedRolePermission = this.prisma.role_permissions.update({
            where: { id: id },
            data: { ...rpDto },
        });
        return updatedRolePermission;
    }

    async deleteRolePermission(id: string) {
        return this.prisma.role_permissions.delete({
            where: { id: id },
        });
    }
}

