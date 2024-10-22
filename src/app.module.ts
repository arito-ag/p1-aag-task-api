import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import * as entitiesUser from './users/entities';
import * as entitiesTask from './tasks/entities';

const allEntities = [
  ...[...Object.values(entitiesUser)],
  ...[...Object.values(entitiesTask)],
];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [...Object.values(allEntities)],
      synchronize: true, // only dev
    }),
    TypeOrmModule.forFeature([...Object.values(allEntities)]),
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}
