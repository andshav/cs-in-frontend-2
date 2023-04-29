import { IStructure, Schema } from "./index.types";

export class Structure implements IStructure {
  #scheme: Schema[];
  #buffer: ArrayBuffer;
  #dataViewer: DataView;
  #getOffsetAndIndexOfSchema: (key: string) => [number, number];
  constructor(schema: Schema[]) {
    this.#scheme = schema;
    const byteSize = schema.reduce((prev, [, , size = 1]) => prev + size, 0);
    this.#buffer = new ArrayBuffer(byteSize * 2);
    this.#dataViewer = new DataView(this.#buffer);
    this.#getOffsetAndIndexOfSchema = new Function(
      "key",
      this.#generateFunctionBodyForGetSchemaElement(schema)
    ) as (key: string) => [number, number];
  }

  get(key: string) {
    const [index, offset] = this.#getOffsetAndIndexOfSchema(key);
    const [, encoding, size = 1] = this.#scheme[index];
    switch (encoding) {
      case "u16": {
        return this.#dataViewer.getUint16(offset * 2);
      }
      case "utf16": {
        let result = "";
        for (let i = 0; i < size; i++) {
          result += String.fromCharCode(
            this.#dataViewer.getUint16((offset + i) * 2)
          );
        }
        return result;
      }
      default: {
        throw new Error(`Encoding "${encoding}" does not exist`);
      }
    }
  }

  set(key: string, value: unknown) {
    const [index, offset] = this.#getOffsetAndIndexOfSchema(key);
    const [, encoding, size = 1] = this.#scheme[index];
    switch (encoding) {
      case "u16": {
        if (typeof value !== "number") {
          throw new Error(`Encoding "u16" expects number`);
        }
        this.#dataViewer.setUint16(offset * 2, value);
        break;
      }
      case "utf16": {
        if (typeof value !== "string") {
          throw new Error(`Encoding "utf16" expects string`);
        }
        if (value.length > size) {
          throw new Error(`"${value}" too long (max length = ${size})`);
        }
        for (let i = 0; i < value.length; i++) {
          this.#dataViewer.setUint16((offset + i) * 2, value.charCodeAt(i));
        }
        break;
      }
      default: {
        throw new Error(`Encoding "${encoding}" does not exist`);
      }
    }
  }

  #generateFunctionBodyForGetSchemaElement(schema: Schema[]) {
    let accumOffset = 0;
    const cases = schema
      .map(([key, , size = 1], index) => {
        accumOffset += size;
        return `case '${key}': return [${index}, ${accumOffset - size}];`;
      })
      .join("\n");

    return `
        switch(key) {
          ${cases}
          default: {
            throw new Error(\`"\${key}" does not exist\`);
          }
        }
      `;
  }
}

const jackBlack = new Structure([
  ["name", "utf16", 10], // Число - это максимальное количество символов
  ["lastName", "utf16", 10],
  ["age", "u16"] // uint16
]);

jackBlack.set("name", "Jack");
jackBlack.set("lastName", "Black");
jackBlack.set("age", 53);

console.log((jackBlack.get("lastName") as string).length); // 'Jack'
