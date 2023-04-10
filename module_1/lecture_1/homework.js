class BitAccessor {
    viewArray;

    constructor(viewArray) {
        this.viewArray = viewArray;
    }

    getElementBit(elementIndex, bitIndex) {
        this.#validate(elementIndex, bitIndex);
        const num = this.viewArray[elementIndex];
        return Number((num & (1 << bitIndex)) !== 0)
    }

    inverseElementBit(elementIndex, bitIndex) {
        this.#validate(elementIndex, bitIndex);
        const num = this.viewArray[elementIndex];
        this.viewArray[elementIndex] = num ^ (1 << bitIndex);
    }

    inverseElementBit2(elementIndex, bitIndex) {
        this.#validate(elementIndex, bitIndex);
        const num = this.viewArray[elementIndex];
        const bit = this.getElementBit(elementIndex, bitIndex);
        let changedNum;
        if (bit === 0) {
           changedNum = num | (1 << bitIndex);
        } else {
           changedNum = num & (num ^ (1 << bitIndex));
        }

        this.viewArray[elementIndex] = changedNum;
    }


    setElementBit(elementIndex, bitIndex, value) {
        this.#validate(elementIndex, bitIndex, value);
        const num = this.viewArray[elementIndex];
        let changedNum;
        if (value === 0) {
            changedNum = num &~(1 << bitIndex);
        } else {
            changedNum = num | (1 << bitIndex);
        }

        this.viewArray[elementIndex] = changedNum;
    }

    get #elementBitLength() {
        return this.viewArray.BYTES_PER_ELEMENT * 8
    }

    #validate(elementIndex, bitIndex, value) {  // TODO move to TS Decorators
        if (!this.viewArray) {
            throw new Error(`View array is not provided`);
        }
        const maxIndex = this.viewArray.length - 1;
        if (elementIndex > maxIndex) {
            throw new Error(`View array length is ${this.viewArray.length}. Element index more than ${maxIndex}`);
        }
        if (bitIndex < 0 || bitIndex > this.#elementBitLength - 1) {
            throw new Error(`Incorrect bit index. Bit index should be between 0 and ${this.#elementBitLength - 1}`);
        }
        if (value !== undefined && ![0, 1].includes(value)) {
            throw new Error('Value should be 0 or 1');
        }
    }
}


const bitAccessor = new BitAccessor(new Uint8Array([0b1110, 0b1101]))

console.log(bitAccessor.getElementBit(0, 1)) // 1
bitAccessor.inverseElementBit(1, 0)
bitAccessor.setElementBit(0, 0, 1)
