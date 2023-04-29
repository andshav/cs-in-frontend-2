export interface IStack {
  push: (value: number) => void;
  pop: () => number;
  get head(): number;
}

export type TypedArray =
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | Int8Array
  | Int16Array
  | Int32Array
  | Float32Array
  | Float64Array;

export interface TypedArrayConstructable {
  new (size: number): TypedArray;
}
