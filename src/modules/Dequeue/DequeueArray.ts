import {IDequeue} from "./interface";

export class DequeueArray<T> implements IDequeue<T>{
    #buffer = [];
    #headIndex: number = 0;
    #tailIndex: number = 0;
    #elemsCount: number = 0;

    constructor(length: number) {
        this.#buffer = new Array(length).fill(null);
    }

    unshift(element) {
        if (this.#elemsCount === this.#buffer.length) {
            throw new Error("The deque is full");
        }
        this.#headIndex = this.#decreaseIndex(this.#headIndex);
        this.#buffer[this.#headIndex] = element;
        this.#elemsCount++;
    }


    push(element) {
        if (this.#elemsCount === this.#buffer.length) {
            throw new Error("The deque is full");
        }
        this.#buffer[this.#tailIndex] = element;
        this.#tailIndex = this.#increaseIndex(this.#tailIndex);
        this.#elemsCount++;
    }

    shift() {
        const element = this.#getHead();
        this.#buffer[this.#headIndex] = null;
        this.#headIndex = this.#increaseIndex(this.#headIndex);
        this.#elemsCount--;
        return element;
    }

    pop() {
        const element = this.#getTail();
        this.#tailIndex = this.#decreaseIndex(this.#tailIndex);
        this.#buffer[this.#tailIndex] = null;
        this.#elemsCount--;
        return element;
    }

    peekShift() {
        return this.#getHead();
    }

    peekPop() {
        return this.#getTail();
    }

    #getHead() {
        if (this.isEmpty()) {
            throw new Error('Deque is empty');
        }
        return this.#buffer[this.#headIndex];
    }

    #getTail() {
        if (this.isEmpty()) {
            throw new Error('Deque is empty');
        }
        return this.#buffer[this.#decreaseIndex(this.#tailIndex)];
    }

    #decreaseIndex(index: number) {
        index--;
        if (index < 0) {
            index = this.#buffer.length - 1;
        }
        return index;
    }

    #increaseIndex(index: number) {
        index++;
        if (index === this.#buffer.length) {
            index = 0;
        }
        return index;
    }

    isEmpty() {
        return this.#elemsCount === 0;
    }
}
