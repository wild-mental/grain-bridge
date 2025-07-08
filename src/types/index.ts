export interface RegionData {
  continent: string;
  event: string;
  amount: number;
  region: string;
}

export interface MatchData {
  id: number;
  surplusRegion: string;
  surplusContinent: string;
  shortageRegion: string;
  shortageContinent: string;
  commodity: string;
  tonnage: number;
  shippingCost: number;
  donatedAmount: number;
  feasibility: number;
}
