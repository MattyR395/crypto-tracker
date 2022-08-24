import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { AuthzModule } from 'src/authz/authz.module';

@Module({
  imports: [AuthzModule],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}
