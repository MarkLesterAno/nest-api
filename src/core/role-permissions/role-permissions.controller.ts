import {
    Controller, Get, Post, Param, Body, Patch, Delete,
    NotFoundException, BadRequestException, Put, UseGuards
} from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { RolePermissionDto } from '../../common/dto';
import { JwtAuthGuard } from '../../common/guard/jwt.guard';


@Controller('role-permissions')
export class RolePermissionsController {
    constructor(private rolePermissionsService: RolePermissionsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createRolePermission(@Body() rpDto: RolePermissionDto) {
        try {
            const { newRolePermission } = await this.rolePermissionsService.createRolePermission(rpDto);
            return newRolePermission;
        } catch (error) {
            throw new BadRequestException('Failed to create role permission');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getRolePermissions() {
        try {
            const roles = await this.rolePermissionsService.getRolePermissions();
            return roles
        } catch (error) {
            throw new BadRequestException('Failed to get role permissions');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getRolePermissionById(@Param('id') id: string) {
        try {
            const Role = await this.rolePermissionsService.getRolePermissionById(id);
            if (!Role) {
                throw new NotFoundException(`Role with ID ${id} not found`);
            }
            return Role;
        } catch (error) {
            throw new BadRequestException('Failed to get role permissions');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateRolePermission(@Param('id') id: string, @Body() rpDto: RolePermissionDto) {
        try {
            return await this.rolePermissionsService.updateRolePermission(id, rpDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update role permission');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patchRolePermission(@Param('id') id: string, @Body() updateRoleDto: Partial<RolePermissionDto>) {
        try {
            return await this.rolePermissionsService.patchRolePermission(id, updateRoleDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update role permission');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteRolePermission(@Param('id') id: string) {
        try {
            return await this.rolePermissionsService.deleteRolePermission(id);
        } catch (error) {
            throw new NotFoundException(`Role permission with ID ${id} not found`);
        }
    }
}
