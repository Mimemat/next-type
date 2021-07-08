import { random } from 'faker';

export const generateWords = (quantity: number): string[] =>
  random
    .words(quantity)
    .toLowerCase()
    .split(' ')
    .map((word) => `${word} `);
