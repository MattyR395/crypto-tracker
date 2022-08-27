import { Module } from '@nestjs/common';
import { HoldingsService } from './holdings.service';
import { HoldingsController } from './holdings.controller';
import { AuthzModule } from 'src/authz/authz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holding } from './entities/holding.entity';

@Module({
  imports: [
    AuthzModule, 
    TypeOrmModule.forFeature([Holding])
  ],
  controllers: [HoldingsController],
  providers: [HoldingsService]
})
export class HoldingsModule {}
