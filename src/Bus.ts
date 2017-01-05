import {IBus} from './IBus';
import {IBusTicket} from './IBusTicket';
import {IBusResponse} from './IBusResponse';

export class Bus implements IBus {
    private tickets: IBusTicket[] = [];

    public getTicket(name: string): IBusTicket {
        for (const ticket of this.tickets) {
            if (ticket.name === name) {
                return ticket;
            }
        }

        return null;
    }

    public addTicket(name: string, fn: any): void {
        if (this.isTicketExists(name)) {
            this.removeTicket(name);
        }

        this.tickets.push({ name: name, fn: fn });
    }

    public removeTicket(name: string): void {
        let ticketToRemove = this.getTicket(name);

        this.tickets = this.tickets.filter((ticket: IBusTicket) => {
            return ticket !== ticketToRemove;
        });
    }

    public async send(): Promise<IBusResponse[]> {
        const responses: IBusResponse[] = [];

        for (const ticket of this.tickets) {
            try {
                responses.push({
                    name: ticket.name,
                    success: await ticket.fn()
                });
            } catch (e) {
                responses.push({
                    name: ticket.name,
                    error: e
                });
            }
        }

        this.clear();
        return responses;
    }

    public getTicketsLength(): number {
        return this.getTickets().length;
    }

    private getTickets(): IBusTicket[] {
        return this.tickets;
    }

    public clear(): void {
        this.tickets = [];
    }

    private isTicketExists(name: string): boolean {
        const ticket = this.getTicket(name);

        if (ticket) {
            return true;
        }

        return false;
    }
}
