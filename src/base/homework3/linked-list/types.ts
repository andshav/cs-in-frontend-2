export interface ILinkedListNode<T> {
  value: T;
  next: ILinkedListNode<T> | null;
  prev: ILinkedListNode<T> | null;
}

export interface ILinkedList<T> {
  pushRight: (value: T) => void;
  pushLeft: (value: T) => void;
  popRight: () => T | null;
  popLeft: () => T | null;
}
