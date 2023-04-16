import { BitAccessor } from "@base/homework1/bit-getter/index.types";

import { AvailableType } from "../index.types";

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
