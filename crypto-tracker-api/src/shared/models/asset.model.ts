import { Holding } from "./holding.model";

export interface Asset extends Holding {
  name: string;
  symbol: string;
  priceUsd: number;
}
