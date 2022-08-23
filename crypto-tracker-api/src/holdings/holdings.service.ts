import { Injectable } from '@nestjs/common';
import { CreateHoldingDto } from './dto/create-holding.dto';
import { UpdateHoldingDto } from './dto/update-holding.dto';

@Injectable()
export class HoldingsService {
  create(createHoldingDto: CreateHoldingDto) {
    return 'This action adds a new holding';
  }

  findAll(): Holding[] {
    return [
      {
        id: 1,
        tokenId: 'bitcoin',
        amount: .004,
        dateAquired: new Date('2019-01-01'),
        paidUsd: 72.75,
      },
      {
        id: 2,
        tokenId: 'ethereum',
        amount: .3,
        dateAquired: new Date('2019-02-27'),
        paidUsd: 548.08,
      }
    ];
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

export interface Holding {
  id: number;
  tokenId: string;
  amount: number;
  dateAquired: Date;
  paidUsd: number;
}