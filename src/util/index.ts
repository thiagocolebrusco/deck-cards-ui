import { Suits, Values } from "@/constants/enums";
import { ICard, ISuit } from "@/constants/interfaces";

export const validateCard = ({ suit, value }: ICard): boolean | void => {
  if (!Suits.find((item) => item.key === suit)) {
    throw new Error("The Suit you chose is invalid. Please fix it.");
  }

  if (!Values.includes(value)) {
    throw new Error("The Value you chose is invalid. Please fix it.");
  }

  return true;
};

export const getCardData = (key: string): ICard => {
  if (!key) throw new Error("Empty card key");

  const suit = key.slice(key.length - 1);
  const value = key.slice(0, key.length - 1);

  return { value: value === "0" ? "10" : value, suit, key: value === "10" ? `0${suit}` : key };
};

const getSuitsOrder = (rotation: ICard): ISuit[] => {
  const mainSuitIndex = Suits.findIndex((suit: ISuit) => suit.key === rotation.suit);
  let i: number = mainSuitIndex || 0;
  const result = [];
  while (i < Suits.length && result.length !== Suits.length) {
    result.push(Suits[i]);
    i += 1;
    if (i === Suits.length) i = 0;
  }

  return result;
};

const getValuesOrder = (rotation: ICard): string[] => {
  const mainValueIndex = Values.findIndex((value: string) => value === rotation.value);
  let i: number = mainValueIndex || 0;
  const result = [];
  while (i < Values.length && result.length !== Values.length) {
    result.push(Values[i]);
    i += 1;
    if (i === Values.length) i = 0;
  }

  return result;
};

export const getCardRank = (card: ICard, rotation: ICard): number => {
  const suitsOrder = getSuitsOrder(rotation);
  const valuesOrder = getValuesOrder(rotation);

  const cardSuitIndex = suitsOrder.findIndex((suit: ISuit) => suit.key === card.suit);
  const cardValueIndex = valuesOrder.findIndex((value: string) => value === card.value);

  console.log(card.key, (cardSuitIndex + 1) * 4 + (cardValueIndex + 1));
  return (cardSuitIndex + 1) * 100 + (cardValueIndex + 1);
};
