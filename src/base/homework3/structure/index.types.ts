export interface IStructure {
  get: (key: string) => unknown;
  set: (key: string, value: unknown) => void;
}

export type EncodingType = "u16" | "utf16";

export type Schema = [key: string, encoding: EncodingType, size?: number];
