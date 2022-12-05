const text = "Hola, mundo";

test('Debe de hacer algo.', () => {
  expect(text).toMatch(/mundo/);
})