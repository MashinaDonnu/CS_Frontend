import {IDequeue} from "./interface";
import {DequeueArray} from "./DequeueArray";
import {DequeueList} from "./DequeueList";

export class Dequeue<T> implements IDequeue<T> {
    #strategy: IDequeue<T>

    constructor(instance: IDequeue<T>) {
        this.#strategy = instance;
    }

    unshift(element) {
       this.#strategy.unshift(element);
    }


    push(element) {
       this.#strategy.push(element);
    }

    shift(): T {
        return this.#strategy.shift();
    }

    pop(): T {
        return this.#strategy.pop();
    }
}


// const dequeue = new Dequeue(new DequeueArray(10))
// Or
const dequeue = new Dequeue(new DequeueList());
dequeue.push(10);
dequeue.unshift(11);
dequeue.push(12);

console.log(dequeue.pop());   // 12
console.log(dequeue.shift()); // 11
console.log(dequeue.pop());   // 10
// console.log(dequeue.pop());   // Exception
