import {IDequeue} from "./interface";
import {DoublyLinkedList} from "../DoublyLinkedList/DoublyLinkedList";

export class DequeueList<T> implements IDequeue<T> {
    #list = new DoublyLinkedList<T>();

    pop(): T {
        return this.#list.removeLast().value;
    }

    push(data: T): void {
        this.#list.addLast(data);
    }

    shift(): T {
        return this.#list.removeFirst().value;
    }

    unshift(data: T): void {
        this.#list.addFirst(data);
    }
}
