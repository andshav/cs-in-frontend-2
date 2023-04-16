import { Schema, ValueType } from "../index.types";
import createBitAccessor from "@base/homework1/bit-getter";
import { getValue, decodeValue } from "./helpers";

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
}
