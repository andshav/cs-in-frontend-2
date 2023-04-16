import {
  DecodeValueProps,
  GetValueProps,
  Schema,
  ValueType
} from "./index.types";
import createBitAccessor from "../../homework1/bit-getter";
import { getBitIndex, getByteIndex } from "./helpers";

export function decode(data: ArrayBuffer, schema: Schema[]): ValueType[] {
  const { length } = schema;
  const result: ValueType[] = new Array(length);
  const { byteLength } = data;
  const dataViewer = new DataView(data);
  const uint8arr = new Uint8Array(byteLength);

  for (let i = 0; i < byteLength; i++) {
    uint8arr[i] = dataViewer.getUint8(i);
  }

  const bitAccessor = createBitAccessor(uint8arr);

  let cursor = 0;

  for (let i = 0; i < length; i++) {
    const [bitSize, type] = schema[i];
    const value = getValue({ bitAccessor, index: cursor, length: bitSize });
    result[i] = decodeValue({ value, type, bitSize });
    cursor += bitSize;
  }

  return result;

  // Helpers

  function getValue({ bitAccessor, length, index }: GetValueProps): string {
    let result = "";

    for (let i = 0; i < length; i++) {
      const offset = index + i;
      result += bitAccessor.get(getByteIndex(offset), getBitIndex(offset));
    }

    return result;
  }

  function decodeAscii({
    value,
    bitSize
  }: Omit<DecodeValueProps, "type">): string {
    const unwantedBits = bitSize % 8;
    const wantedValue = value.slice(unwantedBits);

    return wantedValue.replace(/\d{8}/g, (item) =>
      String.fromCharCode(parseInt(item, 2))
    );
  }

  function decodeValue({ value, type, bitSize }: DecodeValueProps): ValueType {
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
}
