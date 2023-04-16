export class DoublyLink<T> {
    value: T;
    next: DoublyLink<T>
    prev: DoublyLink<T>

    constructor(value: T) {
        this.value = value
    }

    display(): void {
        console.log('Link value: ', this.value);
    }
}
