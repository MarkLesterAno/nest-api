import { MiddlewareConsumer, Module, NestModule,RequestMethod } from '@nestjs/common';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { PassportModule } from '@nestjs/passport';
import { RateLimitMiddleware, LoggerMiddleware } from './common/middleware';
import { LoggerService } from './common/logger/logger.service';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { QueuesModule } from './queues/queues.module';
import { PrioritiesModule } from './priorities/priorities.module';
import { QueueItemsModule } from './queue-items/queue-item.module';


@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CoreModule,
    QueuesModule,
    AssignmentsModule,
    PrioritiesModule,
    QueueItemsModule

  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet()).forRoutes('*');
    consumer.apply(cors()).forRoutes('*');
    consumer.apply(cookieParser()).forRoutes('*');
    consumer.apply(RateLimitMiddleware).forRoutes('*');
    consumer
    .apply(LoggerMiddleware)
    .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
