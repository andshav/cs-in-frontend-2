import { BitAccessor } from "../../homework1/bit-getter/index.types";

export type AvailableType = "number" | "boolean" | "ascii";
export type ValueType = number | boolean | string;

export type Schema = [number, AvailableType];

export interface EncodeValueProps {
  value: ValueType;
  bitSize: number;
  type: AvailableType;
}

export interface SetValueProps {
  bitAccessor: BitAccessor;
  index: number;
  value: string;
}

export interface GetValueProps {
  bitAccessor: BitAccessor;
  index: number;
  length: number;
}

export interface DecodeValueProps {
  value: string;
  type: AvailableType;
  bitSize: number;
}
