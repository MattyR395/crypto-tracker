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

  /**
   * Creates a new holding.
   * @param createHoldingDto Info from the "Add Holding" form.
   * @returns The newly created holding.
   */
  async create(createHoldingDto: CreateHoldingDto) {
    // Create an object which can be added to if the user entered a date aquired.
    const insertValues: any = {
      userId: this.request.user.sub,
      tokenId: createHoldingDto.tokenId,
      amount: createHoldingDto.amount,
      paidUsd: createHoldingDto.paidUsd
    }

    // Add the date aquired if it was 
    if (createHoldingDto.dateAquired) {
      insertValues.dateAquired = new Date(createHoldingDto.dateAquired);
    }

    // Await the creation of the holding then return it.
    return {
      id: (await this.holdingsRepository.insert(insertValues)).generatedMaps[0].id,
      tokenId: insertValues.tokenId,
      amount: insertValues.amount,
      paidUsd: insertValues.paidUsd ?? null,
      dateAquired: insertValues.dateAquired ?? null
    };
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

  async remove(id: number) {
    return {
      success: (await this.holdingsRepository.delete(id)).affected > 0
    };
  }
}