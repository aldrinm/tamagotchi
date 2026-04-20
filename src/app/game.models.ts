export interface Stats {
  hunger: number;
  happiness: number;
  energy: number;
}

export interface Pet {
  name: string;
  evolutionName: string;
  recoveryFormName: string;
}

export interface GameSnapshot {
  pet: Pet;
  stats: Stats;
  isSick: boolean;
  isEvolved: boolean;
  lastUpdatedAt: string;
  evolveSustainTicks: number;
  recoverySustainTicks: number;
}

