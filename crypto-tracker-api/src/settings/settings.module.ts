import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { AuthzModule } from 'src/authz/authz.module';
import { Setting } from './entities/setting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthzModule,
    TypeOrmModule.forFeature([Setting])
  ],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}
