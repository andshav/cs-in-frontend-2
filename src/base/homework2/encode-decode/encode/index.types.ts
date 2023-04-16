import { BitAccessor } from "@base/homework1/bit-getter/index.types";

import { AvailableType, ValueType } from "../index.types";

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
