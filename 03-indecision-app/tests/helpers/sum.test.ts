// sum.test.js
import { describe, expect, test } from 'vitest';
import { addArray, sum } from '../../src/helpers/sum';

describe('add function', () => {
  test('adds 1 + 2 to equal 3', () => {
    // preparación
    const a = 1;
    const b = 2;

    // estimulo
    const result = sum(a, b);

    // comportamiento esperado
    expect(result).toBe(a + b);

    // if (sum(1, 2) !== 4) {
    //   throw new Error('fail');
    // }
  });
});

describe('addArray function', () => {
  test('should return 0 if the array is empty', () => {
    // preparación
    const arrayA: number[] = [];

    // estimulo
    const resultA = addArray(arrayA);

    expect(resultA).toBe(0);
  });

  test('should return the sum of all the numbers in the array', () => {
    // preparación
    const a = 1;
    const b = 4;
    const c = 5;

    const arrayA = [a, b, c];
    const arrayB = [c, a, b];

    // estimulo
    const resultA = addArray(arrayA);
    const resultB = addArray(arrayB);

    expect(resultA).toBe(a + b + c);
    expect(resultB).toBe(c + a + b);
  });
});
