import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RoleDto } from '../../common/dto';
@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService) { }

    async createRole(roleDto: RoleDto) {
        const newRole = await this.prisma.roles.create({
            data: {
                name: roleDto.name,
                description: roleDto.description,
            },
        })
        return { newRole };
    }

    async getRoles() {
        return this.prisma.roles.findMany();
    }

    async getRoleById(id: string) {
        return this.prisma.roles.findUnique({
            where: { id: id },
        });
    }

    async updateRole(id: string, roleDto: RoleDto) {
        return this.prisma.roles.update({
            where: { id: id },
            data: {
                name: roleDto.name,
                description: roleDto.description,
            },
        });
    }

    async patchRole(id: string, roleDto: Partial<RoleDto>) {
        const updatedRole = this.prisma.roles.update({
            where: { id: id },
            data: { ...roleDto },
        });
        return updatedRole;
    }

    async deleteRole(id: string) {
        return this.prisma.roles.delete({
            where: { id: id },
        });
    }
}

