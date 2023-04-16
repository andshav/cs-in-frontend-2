import { EncodeValueProps, SetValueProps } from "./index.types";
import { BYTE_SIZE } from "../constants";
import { isBinaryUnit } from "@base/homework1/bit-getter/index.types";
import { getBitIndex, getByteIndex } from "../helpers";

export function encodeAscii({
  value,
  bitSize
}: Omit<EncodeValueProps, "type">): string {
  if (typeof value !== "string") {
    throw new Error("Invalid type value: expected string");
  }
  if (bitSize < value.length * BYTE_SIZE) {
    throw new Error(`Specified size for ${value} is not enough`);
  }
  return value.replace(/./g, replacer).padStart(bitSize, "0");

  function replacer(char: string) {
    const charCode = char.charCodeAt(0);
    if (charCode > 255) {
      throw new Error(`${char} does not belong to ascii encoding`);
    }
    return char.charCodeAt(0).toString(2).padStart(BYTE_SIZE, "0");
  }
}

export function encodeNumber({
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

export function encodeBoolean({
  value,
  bitSize
}: Omit<EncodeValueProps, "type">): string {
  if (typeof value !== "boolean") {
    throw new Error("Invalid type value: expected boolean");
  }
  return (value ? "1" : "0").padStart(bitSize, "0");
}

export function encodeValue({
  value,
  bitSize,
  type
}: EncodeValueProps): string {
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

export function getByteSize(bitSize: number) {
  return Math.ceil(bitSize / BYTE_SIZE);
}
export function setValue({ bitAccessor, value, index }: SetValueProps) {
  for (let i = 0; i < value.length; i++) {
    const curr = +value[i];
    if (!isBinaryUnit(curr)) {
      throw new Error(`${value} should consist of only 0 and 1`);
    }
    bitAccessor.set(getByteIndex(index + i), getBitIndex(index + i), curr);
  }
}
