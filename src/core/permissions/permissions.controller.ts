import {
    Controller, Get, Post, Param, Body, Patch, Delete,
    NotFoundException, BadRequestException, Put, UseGuards
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionDto} from '../../common/dto';
import { JwtAuthGuard } from '../../common/guard/jwt.guard';

@Controller('permissions')
export class PermissionsController {
    constructor(private permissionsService: PermissionsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createpermission(@Body() permissionDto: PermissionDto) {
        try {
            const { newPermission } = await this.permissionsService.createPermission(permissionDto);
            return newPermission;
        } catch (error) {
            throw new BadRequestException('Failed to create permission');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getpermissions() {
        try {
            const permissions = await this.permissionsService.getPermissions();
            return permissions
        } catch (error) {
            throw new BadRequestException('Failed to get permissions');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getpermissionById(@Param('id') id: string) {
        try {
            const permission = await this.permissionsService.getPermissionById(id);
            if (!permission) {
                throw new NotFoundException(`permission with ID ${id} not found`);
            }
            return permission;
        } catch (error) {
            throw new BadRequestException('Failed to get permissions');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updatepermission(@Param('id') id: string, @Body() permissionDto: PermissionDto) {
        try {
            return await this.permissionsService.updatePermission(id, permissionDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update permission');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patchpermission(@Param('id') id: string, @Body() permissionDto: Partial<PermissionDto>) {
        try {
            return await this.permissionsService.patchPermission(id, permissionDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update permission');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletepermission(@Param('id') id: string) {
        try {
            return await this.permissionsService.deletePermission(id);
        } catch (error) {
            throw new NotFoundException(`permission with ID ${id} not found`);
        }
    }
}
