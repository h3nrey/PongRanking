export function hasDuplicates(array: number[]) {
  return new Set(array).size !== array.length;
}
