import {DoublyLink} from "./DoublyLink";
import {IUser} from "./interface";

export class DoublyLinkedList<T> {
    first: DoublyLink<T> = null;
    last: DoublyLink<T> = null;

    constructor() {}

    addFirst(value: T): DoublyLink<T> {
        const link = new DoublyLink(value);
        if (this.isEmpty()) {
            this.last = link;
        } else {
            this.first.prev = link;
            link.next = this.first;
        }

        this.first = link;
        return link;
    }

    addLast(value: T): DoublyLink<T> {
        const link = new DoublyLink(value);
        if (this.isEmpty()) {
            this.first = link
        } else {
            this.last.next = link
            link.prev = this.last
        }

        this.last = link;
        return link;
    }

    removeFirst(): DoublyLink<T>  {
        if (this.isEmpty()) {
            throw new Error('List is empty');
        }
        const first = this.first;

        if (this.first.next === null) {
            this.last = null;
        } else {
            this.first.next.prev = null;
        }
        this.first = first.next;

        return first;
    }

    removeLast(): DoublyLink<T> {
        if (this.isEmpty()) {
            throw new Error('List is empty');
        }

        const last = this.last;

        if (this.first.next === null) {
            this.last = null;
        } else {
            this.first.next.prev = null;
        }
        this.last = last.prev;
        return last;
    }

    insertAfter(value: T, key: keyof T): DoublyLink<T> {
        if (this.isEmpty()) {
            throw new Error('List is empty');
        }
        let current = this.first;
        while (current.value[key] !== key) {
            current = current.next;
            if (!current) {
                return null;
            }
        }

        const link = new DoublyLink(value);

        if (current === this.last) {
            link.next = null;
            this.last = link;
        } else {

            link.next = current.next;
            current.next.prev = link;
        }

        current.next = link;
        link.prev = current;

        return link;
    }

    isEmpty(): boolean {
       return this.first === null;
    }

    *[Symbol.iterator]() {
        let current = this.first;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }
}


const list = new DoublyLinkedList<IUser>();

list.addFirst({name: 'Alex', age: 23, job: 'Backend'});
list.addFirst({name: 'Bob', age: 31, job: 'Fullstack'});
list.addFirst({name: 'Mixa', age: 19, job: 'Gamedev'});
list.addFirst({name: 'Andrey', age: 18, job: 'Frontend'});

list.first.display(); // Andrey
list.last.display(); // Alex
list.first.next.display(); // Mixa
console.log(list.first.next.value); // Mixa
console.log(list.first.next.prev.value); // Andrey


console.log('Iter list:');
for (const el of list) {
    console.log(el);
}
