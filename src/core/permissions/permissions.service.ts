import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PermissionDto } from '../../common/dto';
@Injectable()
export class PermissionsService {
    constructor(private prisma: PrismaService) { }

    async createPermission(permissionDto: PermissionDto) {
        const newPermission = await this.prisma.permissions.create({
            data: {
                name: permissionDto.name,
                description: permissionDto.description,
                contentType: permissionDto.contentType
            },
        })
        return { newPermission };
    }

    async getPermissions() {
        return this.prisma.permissions.findMany();
    }

    async getPermissionById(id: string) {
        return this.prisma.permissions.findUnique({
            where: { id: id },
        });
    }

    async updatePermission(id: string, permissionDto: PermissionDto) {
        return this.prisma.permissions.update({
            where: { id: id },
            data: {
                name: permissionDto.name,
                description: permissionDto.description,
                contentType: permissionDto.contentType
            },
        });
    }

    async patchPermission(id: string, permissionDto: Partial<PermissionDto>) {
        const updatedPermission = this.prisma.permissions.update({
            where: { id: id },
            data: { ...permissionDto },
        });
        return updatedPermission;
    }

    async deletePermission(id: string) {
        return this.prisma.permissions.delete({
            where: { id: id },
        });
    }
}

