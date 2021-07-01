import { random } from 'faker';

export const generateWords = (quantity: number) => random.words(quantity).toLowerCase().split(' ');