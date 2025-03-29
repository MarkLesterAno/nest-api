import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        RolesModule,
        PermissionsModule,
        RolePermissionsModule
    ],
})
export class CoreModule {}