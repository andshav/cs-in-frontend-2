import {
  EncodeValueProps,
  Schema,
  SetValueProps,
  ValueType
} from "./index.types";
import createBitAccessor from "../../homework1/bit-getter";
import { isBinaryUnit } from "../../homework1/bit-getter/index.types";
import { getByteIndex, getBitIndex } from "./helpers";

export function encode(data: ValueType[], schema: Schema[]): ArrayBuffer {
  if (data.length !== schema.length) {
    throw new Error("Length of schema and length of data must be equal");
  }

  const bitLength = schema.reduce((prev, [bitSize]) => {
    if (bitSize < 0) {
      throw new Error("Bit-size must be positive");
    }
    return prev + bitSize;
  }, 0);

  const byteLength = getByteSize(bitLength);

  const byteArray = new Uint8Array(byteLength);
  const bitAccessor = createBitAccessor(byteArray);
  let cursor = 0;

  for (let i = 0; i < data.length; i++) {
    const [bitSize, type] = schema[i];
    const value = encodeValue({ value: data[i], bitSize, type });
    setValue({ bitAccessor, index: cursor, value });
    cursor += value.length;
  }

  return byteArray.buffer;

  // Helpers
  function encodeAscii({
    value,
    bitSize
  }: Omit<EncodeValueProps, "type">): string {
    if (typeof value !== "string") {
      throw new Error("Invalid type value: expected string");
    }
    if (bitSize < value.length * 8) {
      throw new Error(`Specified size for ${value} is not enough`);
    }
    return value.replace(/./g, replacer).padStart(bitSize, "0");

    function replacer(char: string) {
      const charCode = char.charCodeAt(0);
      if (charCode > 255) {
        throw new Error(`${char} does not belong to ascii encoding`);
      }
      return char.charCodeAt(0).toString(2).padStart(8, "0");
    }
  }

  function encodeNumber({
    value,
    bitSize
  }: Omit<EncodeValueProps, "type">): string {
    if (typeof value !== "number") {
      throw new Error("Invalid type value: expected number");
    }
    if ((1 << bitSize) - 1 < value) {
      throw new Error(`Specified size for ${value} is not enough`);
    }
    return value.toString(2).padStart(bitSize, "0");
  }

  function encodeBoolean({
    value,
    bitSize
  }: Omit<EncodeValueProps, "type">): string {
    if (typeof value !== "boolean") {
      throw new Error("Invalid type value: expected boolean");
    }
    return (value ? "1" : "0").padStart(bitSize, "0");
  }

  function encodeValue({ value, bitSize, type }: EncodeValueProps): string {
    switch (type) {
      case "ascii": {
        return encodeAscii({ value, bitSize });
      }
      case "boolean": {
        return encodeBoolean({ value, bitSize });
      }
      case "number": {
        return encodeNumber({ value, bitSize });
      }
      default: {
        return "";
      }
    }
  }

  function getByteSize(bitSize: number) {
    return Math.ceil(bitSize / 8);
  }
  function setValue({ bitAccessor, value, index }: SetValueProps) {
    for (let i = 0; i < value.length; i++) {
      const curr = +value[i];
      if (!isBinaryUnit(curr)) {
        throw new Error(`${value} should consist of only 0 and 1`);
      }
      bitAccessor.set(getByteIndex(index + i), getBitIndex(index + i), curr);
    }
  }
}
