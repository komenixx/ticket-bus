import {IBusTicket} from "./IBusTicket";

export interface IBus {
    tickets: IBusTicket[];

    getTicket(name: string): IBusTicket;
    addTicket(name, fn): void;
    removeTicket(name: string): void;
    getTickets(): IBusTicket[];
    getTicketResponses(): IBusTicket[];
    getTicketsLength(): number;
    send(): Promise<any>;
    clear(): void;
}
