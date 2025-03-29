import { Injectable } from '@nestjs/common';
import { UserDto } from '../../common/dto';
import { PrismaService } from '../../common/prisma/prisma.service';
import * as argon2 from 'argon2';


@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(createUserDto: UserDto) {
        const hashedPassword = await argon2.hash(createUserDto.password);
        const newUser = await this.prisma.users.create({
            data: {
                email: createUserDto.email,
                username: createUserDto.username,
                password: hashedPassword,
                isActive: createUserDto.isActive,
                roles: createUserDto.roles
            },
        })
        return {newUser};
    }

    async getUsers() {
        return this.prisma.users.findMany();
    }

    async getUserById(id: string) {
        return this.prisma.users.findUnique({
            where: { id: id },
        });
    }

    async updateUser(id: string, updateUserDto: UserDto) {
        const hashedPassword = await argon2.hash(updateUserDto.password);
        return this.prisma.users.update({
            where: { id: id },
            data: {  email: updateUserDto.email,
                username: updateUserDto.username,
                password: hashedPassword,
                isActive: updateUserDto.isActive,
                roles: updateUserDto.roles },
        });
    }

    async patchUser(id: string, updateUserDto: Partial<UserDto>) {
        if (updateUserDto.password) {
            const hashedPassword = await argon2.hash(updateUserDto.password);
            updateUserDto.password = hashedPassword;
        }
        const updatedUser = this.prisma.users.update({
            where: { id: id },
            data: { ...updateUserDto },
        });
        return updatedUser;
    }

    async deleteUser(id: string) {
        return this.prisma.users.delete({
            where: { id: id },
        });
    }
}
