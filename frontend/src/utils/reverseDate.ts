export function reverseDate(this: string): string {
  return this.split('-').reverse().join('-');
}
