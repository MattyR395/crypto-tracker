import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Holding' })
export class Holding {
  @PrimaryGeneratedColumn()
  id: number;
    
  @Column()
  userId: string;

  @Column()
  tokenId: string;

  @Column({ type: 'decimal', precision: 36, scale: 18 })
  amount: number;

  @Column()
  paidUsd: number;

  @Column()
  dateAquired: Date;
}
