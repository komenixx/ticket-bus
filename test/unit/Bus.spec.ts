declare let sinon;

import {Bus} from "../../src/Bus";
import {IBus} from "../../src/IBus";
import {IBusTicket} from "../../src/IBusTicket";

describe('Bus', () => {
    let bus: IBus;

    beforeEach(() => {
        bus = new Bus();
    });

    it('add ticket', () => {
        bus.addTicket('name', () => {});

        let addedTicket: IBusTicket = bus.getTicket('name');

        expect(addedTicket).toBeDefined();
        expect(addedTicket.name).toBe('name');

    });

    it('get ticket', () => {
        let ticket: IBusTicket = bus.getTicket('name');

        expect(ticket).toBeNull();

        bus.addTicket('name', () => {});

        ticket = bus.getTicket('name');

        expect(ticket).not.toBeNull();
        expect(ticket.name).toBe('name');
    });

    it('remove ticket', () => {
        bus.removeTicket('name');

        expect(bus.getTicketsLength()).toBe(0);

        bus.addTicket('name', () => {});

        bus.removeTicket('name');

        expect(bus.getTicketsLength()).toBe(0);
    });

    it('send', (done) => {
        let obj = {
            create: () => {}
        };

        obj.create = sinon.spy(() => {
            done();
        });

        bus.addTicket('name', () => obj.create());

        bus.send();
    });
});
