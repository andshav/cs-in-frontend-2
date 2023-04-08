import createBitAccessor from "./index";

describe("BitAccessor", function () {
  const bitter = createBitAccessor(new Uint8Array([0b0101, 0b1010]));
  test("get bit value", () => {
    expect(bitter.get(0, 1)).toBe(0);
    expect(bitter.get(1, 3)).toBe(1);
  });
  test("set bit value", () => {
    bitter.set(0, 5, 1);
    bitter.set(1, 1, 0);
    expect(bitter.get(0, 5)).toBe(1);
    expect(bitter.get(1, 1)).toBe(0);
  });
  test("elemIndex out of array range", () => {
    expect(() => bitter.get(3, 0)).toThrow("elemIndex out of array range");
    expect(() => bitter.get(-1, 0)).toThrow("elemIndex out of array range");
  });
  test("bitIndex must be non-negative and less than 8", () => {
    expect(() => bitter.get(0, -1)).toThrow(
      "bitIndex must be non-negative and less than 8"
    );
    expect(() => bitter.get(1, 9)).toThrow(
      "bitIndex must be non-negative and less than 8"
    );
  });
});
