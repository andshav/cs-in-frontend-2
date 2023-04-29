import { IStack, TypedArray, TypedArrayConstructable } from "./types";

class Stack implements IStack {
  #buffer: TypedArray;
  #cursor: number;

  constructor(typedArray: TypedArrayConstructable, size: number) {
    this.#buffer = new typedArray(size);
    this.#cursor = -1;
  }
  push(value: number) {
    if (this.#cursor === this.#buffer.length - 1) {
      throw new Error("Stack overflow");
    }
    this.#buffer[++this.#cursor] = value;
  }
  pop() {
    if (this.#cursor === -1) {
      throw new Error("Stack is empty");
    }
    return this.#buffer[this.#cursor--];
  }

  get head() {
    return this.#buffer[this.#cursor];
  }
}

const stack = new Stack(Int32Array, 3);

stack.push(10);
stack.push(11);
stack.push(12);

console.log(stack.head); // 12

console.log(stack.pop()); // 12

console.log(stack.head); // 11

console.log(stack.pop()); // 11
console.log(stack.pop()); // 10
console.log(stack.pop()); // Exception
