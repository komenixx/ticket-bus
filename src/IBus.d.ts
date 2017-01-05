import {IBusTicket} from "./IBusTicket";

export interface IBus {
    getTicket(name: string): IBusTicket;
    addTicket(name, fn): void;
    removeTicket(name: string): void;
    send(): Promise<any>;
    clear(): void;
    getTicketsLength(): number;
}
