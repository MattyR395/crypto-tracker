import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HoldingsModule } from './holdings/holdings.module';
import { SettingsModule } from './settings/settings.module';
import * as dotenv from 'dotenv';
import { Holding } from './holdings/entities/holding.entity';
import { Setting } from './settings/entities/setting.entity';

dotenv.config();

@Module({
  imports: [
    HoldingsModule, 
    SettingsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Holding, Setting],
      synchronize: process.env.NODE_ENV === 'development',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
