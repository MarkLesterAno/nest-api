import {
    Controller, Get, Post, Param, Body, Patch, Delete,
    NotFoundException, BadRequestException, Put,UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from '../../common/dto/user.dto';
import { JwtAuthGuard } from '../../common/guard/jwt.guard';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async createUser(@Body() createUserDto: UserDto) {
        try {
            const { newUser } = await this.usersService.createUser(createUserDto);
            return newUser;
        } catch (error) {
            throw new BadRequestException('Failed to create user');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUsers() {
        return await this.usersService.getUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        const user = await this.usersService.getUserById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UserDto) {
        try {
            const user = await this.usersService.updateUser(id, updateUserDto);
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update user');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patchUser(@Param('id') id: string, @Body() updateUserDto: Partial<UserDto>) {
        try {
            return await this.usersService.patchUser(id, updateUserDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException('Failed to update user');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        try {
            return await this.usersService.deleteUser(id);
        } catch (error) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
