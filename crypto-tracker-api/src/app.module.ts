import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HoldingsModule } from './holdings/holdings.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [HoldingsModule, SettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
