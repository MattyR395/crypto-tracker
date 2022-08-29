import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHoldingDto } from './dto/create-holding.dto';
import { UpdateHoldingDto } from './dto/update-holding.dto';
import { Holding } from './entities/holding.entity';

@Injectable({ scope: Scope.REQUEST })
export class HoldingsService {
  constructor(
    @InjectRepository(Holding) private holdingsRepository: Repository<Holding>,
    @Inject(REQUEST) private readonly request: { user: { sub: string } }
  ) {}

  create(createHoldingDto: CreateHoldingDto) {
    return 'This action adds a new holding';
  }

  findAll(): Promise<Holding[]> {
    return this.holdingsRepository.find({
      select: ['id', 'tokenId', 'amount', 'paidUsd', 'dateAquired'],
      where: {
        userId: this.request.user.sub
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} holding`;
  }

  update(id: number, updateHoldingDto: UpdateHoldingDto) {
    return `This action updates a #${id} holding`;
  }

  remove(id: number) {
    return `This action removes a #${id} holding`;
  }
}