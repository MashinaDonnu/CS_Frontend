import {DoublyLinkedList} from "../DoublyLinkedList/DoublyLinkedList";

export class LinkedListQueue<T> {
    list: DoublyLinkedList<T>;

    constructor() {
        this.list = new DoublyLinkedList<T>();
    }

    push(data: T) {
        return this.list.addFirst(data);
    }

    pop() {
        try {
            return this.list.removeLast();
        } catch (error) {
            throw error;
        }
    }
}


const list = new LinkedListQueue<number>();
list.push(10);
list.push(20);
list.push(30);
console.log(list.pop());
console.log(list);

