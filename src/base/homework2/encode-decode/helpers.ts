import { BYTE_SIZE } from "./constants";

export function getByteIndex(index: number) {
  return Math.floor(index / BYTE_SIZE);
}

export function getBitIndex(index: number) {
  return index % BYTE_SIZE;
}
