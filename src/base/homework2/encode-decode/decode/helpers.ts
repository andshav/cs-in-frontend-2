import { DecodeValueProps, GetValueProps, ValueType } from "./index.types";
import { getByteIndex, getBitIndex } from "../helpers";
import { BYTE_SIZE } from "../constants";

export function getValue({
  bitAccessor,
  length,
  index
}: GetValueProps): string {
  let result = "";

  for (let i = 0; i < length; i++) {
    const offset = index + i;
    result += bitAccessor.get(getByteIndex(offset), getBitIndex(offset));
  }

  return result;
}

export function decodeAscii({
  value,
  bitSize
}: Omit<DecodeValueProps, "type">): string {
  const unwantedBits = bitSize % BYTE_SIZE;
  const wantedValue = value.slice(unwantedBits);

  return wantedValue.replace(new RegExp(`\\d{${BYTE_SIZE}}`, "g"), (item) =>
    String.fromCharCode(parseInt(item, 2))
  );
}

export function decodeValue({
  value,
  type,
  bitSize
}: DecodeValueProps): ValueType {
  switch (type) {
    case "ascii": {
      return decodeAscii({ value, bitSize });
    }
    case "number": {
      return parseInt(value, 2);
    }
    case "boolean": {
      return Boolean(parseInt(value, 2));
    }
  }
}
