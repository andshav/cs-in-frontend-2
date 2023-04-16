export function getByteIndex(index: number) {
  return Math.floor(index / 8);
}

export function getBitIndex(index: number) {
  return index % 8;
}
