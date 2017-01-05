import {IBus} from "./IBus";
import {IBusTicket} from "./IBusTicket";
import * as async from "async";
import * as _ from "lodash";
import 'bluebird';

export class Bus implements IBus {
    tickets: IBusTicket[];

    constructor() {
        this.tickets = [];
    }

    getTicket(name: string): IBusTicket {
        let ticket = this.tickets.find((x: IBusTicket) => x.name === name);

        if (_.isUndefined(ticket)) {
            return null;
        }

        return ticket;
    }

    addTicket(name: string, fn): void {
        if (this.getTicket(name)) {
            this.removeTicket(name);
        }

        this.tickets.push({
            name: name,
            fn: fn,
            success: null,
            error: null
        });
    }

    removeTicket(name: string): void {
        this.tickets = this.tickets.filter((ticket: IBusTicket) => {
           if (ticket.name !== name) {
               return ticket;
           }
        });
    }

    getTickets(): IBusTicket[] {
        return this.tickets;
    }

    getTicketResponses(): IBusTicket[] {
        let responses: IBusTicket[] = [];
        let tickets = this.getTickets();

        tickets.map((ticket: IBusTicket) => {
            responses.push({
                name: ticket.name,
                fn: null,
                success: ticket.success,
                error: ticket.error
            });
        });

        return responses;
    }

    getTicketsLength(): number {
        return this.getTickets().length;
    }

    send() {
        return new Promise((resolve) => {
            async.each(this.tickets, (relay, callback) => {
                relay.fn()
                    .then((success) => {
                        relay.success = success;
                        callback();
                    })
                    .catch((error) => {
                        relay.error = error;
                        callback();
                    });

            }, () => {
                resolve();
            })
        }).then(() => {
            let ticketResponses = this.getTicketResponses();
            this.tickets = [];
            return ticketResponses;
        });
    }

    clear(): void {
        this.tickets = [];
    }
}
