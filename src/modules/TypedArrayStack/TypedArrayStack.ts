import {TypedArray, TypedArrayParam} from "./interface";

export class TypedArrayStack {
    #array: TypedArray;
    #tailIndex = 0;
    constructor(arr: TypedArrayParam, length: number) {
        const bufferSize = arr.BYTES_PER_ELEMENT * length;
        const buffer = new ArrayBuffer(bufferSize)
        this.#array = new arr(buffer)
    }

    push(data: any) {
        this.#array[this.#tailIndex] = data;
        this.#tailIndex = this.#increaseIndex(this.#tailIndex)
    }

    pop() {
       const element = this.#array[this.#tailIndex - 1];
       this.#tailIndex = this.#decreaseIndex(this.#tailIndex);
       return element;
    }

    #increaseIndex(index) {
        index++;
        if (index > this.#array.length - 1) {
            throw new Error('Stack is filled');
        }
        return index;
    }

    #decreaseIndex(index) {
        index--;
        if (index < 0) {
            throw new Error('Index less than 0');
        }
        return index;
    }

    display() {
        console.log('[Typed Array]: ', this.#array);
    }

    get head() {
        return this.#array[this.#tailIndex - 1];
    }
}

const typedStack = new TypedArrayStack(Int32Array, 10)
console.log('typedStack ======')
typedStack.push(10)
typedStack.push(20)
typedStack.push(3000)
typedStack.push(40)
typedStack.push(40)
typedStack.display()
console.log('head: ', typedStack.head)
console.log(typedStack.pop())
console.log(typedStack.pop())
console.log(typedStack.pop())
console.log(typedStack.pop())



