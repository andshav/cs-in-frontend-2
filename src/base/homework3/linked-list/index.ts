import { ILinkedList, ILinkedListNode } from "./types";

class LinkedListNode<T> implements ILinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  prev: LinkedListNode<T> | null;

  constructor({
    value,
    prev = null,
    next = null
  }: {
    value: T;
    prev?: LinkedListNode<T> | null;
    next?: LinkedListNode<T> | null;
  }) {
    this.value = value;
    this.prev = prev;
    this.next = next;
    if (prev != null) {
      prev.next = this;
    }
    if (next != null) {
      next.prev = this;
    }
  }
}

class LinkedListClass<T> implements ILinkedList<T> {
  first: ILinkedListNode<T> | null;
  last: ILinkedListNode<T> | null;

  constructor() {
    this.first = null;
    this.last = null;
  }

  pushRight(value: T) {
    this.last = new LinkedListNode({ value, prev: this.last });
    if (this.first == null) {
      this.first = this.last;
    }
  }
  pushLeft(value: T) {
    this.first = new LinkedListNode({ value, next: this.first });
    if (this.last == null) {
      this.last = this.first;
    }
  }
  popLeft() {
    if (this.first == null) {
      return null;
    }
    const { value } = this.first;
    if (this.first.next == null) {
      this.first = null;
      this.last = null;
      return value;
    }
    this.first = this.first.next;
    this.first.prev = null;
    return value;
  }
  popRight() {
    if (this.last == null) {
      return null;
    }
    const { value } = this.last;
    if (this.last.prev == null) {
      this.first = null;
      this.last = null;
      return value;
    }
    this.last = this.last.prev;
    this.last.prev = null;
    return value;
  }

  [Symbol.iterator]() {
    let cursor = this.first;

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (cursor == null) {
          return {
            value: undefined,
            done: true
          };
        }
        const { value } = cursor;
        cursor = cursor.next;
        return {
          value: value,
          done: false
        };
      }
    };
  }
}

export function LinkedList() {
  return new LinkedListClass();
}

const list = LinkedList();

list.pushRight(1);
list.pushRight(2);
list.pushRight(3);

console.log(...list); // 1
