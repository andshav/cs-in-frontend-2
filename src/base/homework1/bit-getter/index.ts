import { BinaryUnit, createBitAccessorApi } from "./index.types";

export default function createBitAccessor(
  uint8Arr: Uint8Array
): createBitAccessorApi {
  function validate(elemIndex: number, bitIndex: number) {
    if (elemIndex < 0 || elemIndex >= uint8Arr.length) {
      throw new Error("elemIndex out of array range");
    }
    if (bitIndex < 0 || bitIndex > 7) {
      throw new Error("bitIndex must be non-negative and less than 8");
    }
  }

  return {
    get(elemIndex: number, bitIndex: number): BinaryUnit {
      validate(elemIndex, bitIndex);
      return ((1 << bitIndex) & uint8Arr[elemIndex]) === 0 ? 0 : 1;
    },
    set(elemIndex: number, bitIndex: number, newValue: BinaryUnit) {
      validate(elemIndex, bitIndex);
      const summand = 1 << bitIndex;
      if (newValue === 0) {
        uint8Arr[elemIndex] &= ~summand;
      } else {
        uint8Arr[elemIndex] |= summand;
      }
    }
  };
}
