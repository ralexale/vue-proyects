import { useCounter } from '@/composables/userCounter';

describe('useCounter', () => {
  test('initializes the counter with the default value', () => {
    // preparación
    const { counter, squareCounter } = useCounter(5);

    // comportamiento esperado
    expect(counter.value).toBe(5);
    expect(squareCounter.value).toBe(25);
  });
  
  test('initializes the counter with the value passed as a prop', () => {
    // preparación
    const initialValue = 10;
    const { counter, squareCounter } = useCounter(initialValue);

    // comportamiento esperado
    expect(counter.value).toBe(initialValue);
    expect(squareCounter.value).toBe(initialValue * initialValue);
  });

  test('should increment counter correctly', () => {
    // preparación
    const { counter, squareCounter } = useCounter();

    // estimulo
    counter.value++;

    // comportamiento esperado
    expect(counter.value).toBe(6);
    expect(squareCounter.value).toBe(36);
  })
});
