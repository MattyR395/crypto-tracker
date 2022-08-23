import { Module } from '@nestjs/common';
import { HoldingsService } from './holdings.service';
import { HoldingsController } from './holdings.controller';
import { AuthzModule } from 'src/authz/authz.module';

@Module({
  imports: [AuthzModule],
  controllers: [HoldingsController],
  providers: [HoldingsService]
})
export class HoldingsModule {}
