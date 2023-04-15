import BitAccessor from "../BitAccessor/BitAccessor";
import {TEncodeDecodeData, TEncodeDecodeSchema, TEncodeDecodeSchemaType} from "./interface";

const schema: TEncodeDecodeSchema = [
    [3, 'number'],  // 3 бита число
    [2, 'number'],  // 3 бита число
    [1, 'boolean'], // 1 бит логический
    [1, 'boolean'], // 1 бит логический
    [16, 'ascii'],  // 16 бит 2 аски символа
];

export class EncodeDecode {
    encode(data: TEncodeDecodeData[], schema: TEncodeDecodeSchema): ArrayBuffer {
        if (data.length !== schema.length) {
            throw new Error('Incorrect entry params')
        }
        const bytesCount = Math.ceil(schema.reduce((acc, item) => acc += item[0], 0) / 8);
        const buffer = new ArrayBuffer(bytesCount);
        const uint8Array = new Uint8Array(buffer);
        const bitAccessor = new BitAccessor(uint8Array);

        let bitIndex = 0;
        let byteIndex = 0;
        for (let i = 0; i < data.length; i++) {
            const [bits, type] = schema[i];
            const dataItem = data[i];
            this.#validate(dataItem, type);
            if (type === 'ascii') {
                bitIndex = 0;
                byteIndex++;
                const bytes = bits / 8;
                for (let j = 0; j < bytes; j++) {
                    bitAccessor.viewArray[byteIndex] = String(dataItem)[j].charCodeAt(0);
                    byteIndex++;
                }

            } else {
                const binaryItem = Number(dataItem).toString(2);
                const offset = bits - binaryItem.length;

                for (let j = binaryItem.length - 1; j >= 0; j--) {
                    if (bitIndex >= 8) {
                        bitIndex = 0;
                        byteIndex++;
                    }
                    bitAccessor.setElementBit(byteIndex, bitIndex, Number(binaryItem[j]));
                    bitIndex++;
                }

                if (offset > 0) {
                    if (bitIndex >= 8) {
                        bitIndex = 0;
                        byteIndex++;
                    }
                    bitAccessor.setElementBit(byteIndex, bitIndex, 0);
                    bitIndex++;
                }
            }
        }

        return uint8Array.buffer;
    }


    decode(data: ArrayBuffer, schema: TEncodeDecodeSchema): TEncodeDecodeData[] {
        const uint8Array = new Uint8Array(data);
        const bitAccessor = new BitAccessor(uint8Array);

        let result = [];
        let bitIndex = 0;
        let byteIndex = 0;
        for (const [bits, type] of schema) {
            if (type === 'ascii') {
                bitIndex = 0;
                byteIndex++;
                let asciiItems = '';
                const bytes = bits / 8;
                for (let j = 0; j < bytes; j++) {
                    asciiItems += String.fromCharCode(uint8Array[byteIndex]);
                    byteIndex++;
                }
                result.push(asciiItems);

            } else {
                let binaryItem = [];
                for (let j = 0; j < bits; j++) {
                    binaryItem.unshift(bitAccessor.getElementBit(byteIndex, bitIndex));
                    bitIndex++;
                }
                const resultItem = this.#formatData(type, parseInt(binaryItem.join(''), 2))
                result.push(resultItem);
            }
        }

        return result;
    }

    #formatData(type: TEncodeDecodeSchemaType, data: TEncodeDecodeData): TEncodeDecodeData {
        switch (type) {
            case 'number':
                return Number(data)
            case 'string':
                return String(data)
            case 'boolean':
                return Boolean(data)
            default: return data
        }
    }

    #validate(data: TEncodeDecodeData, type: TEncodeDecodeSchemaType) {
         if (type === 'number' || type === 'string' || type === 'boolean') {
             if (typeof data !== type) {
                 throw new Error(`Schema item type: "${type}" is not assignable to data item ${data} with type "${typeof data}"`);
             }
         }
    }


}

const encodeDecode = new EncodeDecode();
const data = encodeDecode.encode([2, 1, true, false, 'ab'], schema);
console.log(encodeDecode.decode(data, schema));

