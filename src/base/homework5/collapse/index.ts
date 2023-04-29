import { isObject } from "./helpers";

function collapseRecursive(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  function _collapseRecursive(val: unknown, keyChain = ""): void {
    if (isObject(val)) {
      for (const key in val) {
        _collapseRecursive(
          val[key],
          keyChain === "" ? key : keyChain + "." + key
        );
      }
      return;
    }
    result[keyChain] = val;
  }

  _collapseRecursive(obj);

  return result;
}

function collapseStack(obj: object): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const queue: Array<[unknown, string]> = [[obj, ""]];

  while (queue.length > 0) {
    const [value, keyChain] = queue.shift() as [unknown, string];
    if (isObject(value)) {
      for (const key in value) {
        queue.push([value[key], keyChain === "" ? key : keyChain + "." + key]);
      }
    } else {
      result[keyChain] = value;
    }
  }

  return result;
}

const obj = {
  a: {
    b: [1, 2],
    "": { c: 2 }
  }
};

/* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
console.log(collapseStack(obj));
console.log(collapseRecursive(obj));
