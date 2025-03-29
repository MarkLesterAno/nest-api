import {
    Controller, Get, Post, Param, Body, Patch, Delete,
    NotFoundException, BadRequestException, Put, UseGuards
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from '../../common/dto';
import { JwtAuthGuard } from '../../common/guard/jwt.guard';


@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createRole(@Body() roleDto: RoleDto) {
        try {
            const { newRole } = await this.rolesService.createRole(roleDto);
            return newRole;
        } catch (error) {
            throw new BadRequestException('Failed to create Role');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getRoles() {
        try {
            const roles = await this.rolesService.getRoles();
            return roles
        } catch (error) {
            throw new BadRequestException('Failed to get Roles');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getRoleById(@Param('id') id: string) {
        try {
            const Role = await this.rolesService.getRoleById(id);
            if (!Role) {
                throw new NotFoundException(`Role with ID ${id} not found`);
            }
            return Role;
        } catch (error) {
            throw new BadRequestException('Failed to get Roles');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateRole(@Param('id') id: string, @Body() updateRoleDto: RoleDto) {
        try {
            return await this.rolesService.updateRole(id, updateRoleDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update Role');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patchRole(@Param('id') id: string, @Body() updateRoleDto: Partial<RoleDto>) {
        try {
            return await this.rolesService.patchRole(id, updateRoleDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update Role');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteRole(@Param('id') id: string) {
        try {
            return await this.rolesService.deleteRole(id);
        } catch (error) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
    }
}
