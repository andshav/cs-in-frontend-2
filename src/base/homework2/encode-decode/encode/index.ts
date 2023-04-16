import { Schema, ValueType } from "../index.types";
import createBitAccessor from "@base/homework1/bit-getter";
import { getByteSize, setValue, encodeValue } from "./helpers";

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
}
