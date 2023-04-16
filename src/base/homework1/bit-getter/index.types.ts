export type BinaryUnit = 1 | 0;
export interface BitAccessor {
  get: (elemIndex: number, bitIndex: number) => BinaryUnit;
  set: (elemIndex: number, bitIndex: number, newValue: BinaryUnit) => void;
}

export function isBinaryUnit(value: unknown): value is BinaryUnit {
  return value === 1 || value === 0;
}
