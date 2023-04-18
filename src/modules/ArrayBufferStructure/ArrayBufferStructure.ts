import {TStructureSchema, TStructureSchemaItem} from "./interface";

export class Structure {
    #schema: TStructureSchema;
    #buffer: ArrayBuffer;
    #dataView: Uint16Array;

    constructor(data: TStructureSchema) {
        this.#schema = data;
        this.#buffer = new ArrayBuffer(this.#getSize(data));
        this.#dataView = new Uint16Array(this.#buffer);
    }

    get(key: string): unknown {
        const {element, offset} = this.#getSchemaItem(key);
        const [_, type, bytes] = element;
        if (type === 'utf16') {
            let result = '';
            for (let i = offset; i < bytes + offset; i++) {
                result += String.fromCharCode(this.#dataView[i]);
            }
            return result;
        } else if (type === 'u16') {
            return this.#dataView[offset];
        } else {
            throw new Error('Element not found');
        }
    }

    set(key: string, value: unknown): void {
        const {element, offset} = this.#getSchemaItem(key);
        const [_, type, bytes] = element;
        if (type === 'utf16' && typeof value === 'string') {

            const length = value.length > bytes ? bytes : value.length
            for (let i = 0; i < length; i++) {
                this.#dataView[i + offset] = value[i].charCodeAt(0);
            }

        } else if (type === 'u16' && typeof value === 'number') {
            this.#dataView[offset] = value;
        } else {
            throw new Error('Incorrect input data');
        }
    }

    #getSize(data: TStructureSchema): number {
       return data.reduce((acc, dataItem) => {
           const symbolsCount = dataItem[2];
           acc += symbolsCount ? symbolsCount : 1;
           return acc;
       }, 0) * 2
    }

    #getSchemaItem(key: string): {offset: number, element: TStructureSchemaItem} {
        let offset = 0;
        let element: TStructureSchemaItem;
        for (let i = 0; i < this.#schema.length; i++) {
            if (i > 0) {
                offset += this.#schema[i - 1][2];
            }
            if (this.#schema[i][0] === key) {
                element = this.#schema[i];
                break;
            }
        }

        return {offset, element};
    }
}

const structure = new Structure([
    ['name', 'utf16', 10], // Число - это максимальное количество символов
    ['lastName', 'utf16', 10],
    ['age', 'u16'] // uint16
]);

structure.set('lastName', 'Black');
structure.set('name', 'Jack');
structure.set('age', 53);

console.log(structure.get('lastName')); // 'Black'
console.log(structure.get('name')); // 'Jack'
console.log(structure.get('age')); // 53
