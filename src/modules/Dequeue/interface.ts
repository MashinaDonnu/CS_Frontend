export interface IDequeue<T> {
    push(data: T): void;
    pop(): T;
    unshift(data: T): void;
    shift(): T;
}
