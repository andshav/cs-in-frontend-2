function isValid(str: string): boolean {
  const openingBrackets = ["(", "[", "{"];
  const closingBrackets = [")", "]", "}"];
  const accordanceMap = new Map(
    openingBrackets.map((br, index) => [br, closingBrackets[index]])
  );
  const stack: string[] = [];
  for (const char of str) {
    if (openingBrackets.includes(char)) {
      stack.push(char);
      continue;
    }
    if (closingBrackets.includes(char)) {
      if (stack.length === 0) {
        return false;
      }
      const last = stack.pop() as string;
      if (accordanceMap.get(last) !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
