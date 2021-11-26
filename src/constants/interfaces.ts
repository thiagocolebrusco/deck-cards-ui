export interface ICard {
  value: string;
  suit: string;
  key: string;
}

export interface IDeck {
  deckId: string;
  remaining: number;
  shuffled: boolean;
  success: boolean;
}

export interface ISuit {
  key: string;
  name: string;
  symbol: string;
}
