export type BinaryUnit = 1 | 0;
export interface createBitAccessorApi {
  get: (elemIndex: number, bitIndex: number) => BinaryUnit;
  set: (elemIndex: number, bitIndex: number, newValue: BinaryUnit) => void;
}
