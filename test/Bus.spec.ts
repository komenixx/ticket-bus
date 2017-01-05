import {IBus} from '../src/IBus';
import {Bus} from '../src/Bus';
import {IBusTicket} from '../src/IBusTicket';

declare const sinon;

describe('Bus', () => {
    let bus: IBus;

    beforeEach(() => {
        bus = new Bus();
    });

    it('get ticket', () => {
        let ticket: IBusTicket = bus.getTicket('name');

        expect(ticket).toBeNull();

        bus.addTicket('name', () => {});

        ticket = bus.getTicket('name');

        expect(ticket).not.toBeNull();
        expect(ticket.name).toBe('name');

        ticket = bus.getTicket('notExistingName');

        expect(ticket).toBeNull();
    });

    it('add ticket', () => {
        bus.addTicket('name', 'fn1');
        let addedTicket = bus.getTicket('name');

        expect(addedTicket).toBeDefined();
        expect(addedTicket.name).toBe('name');
        expect(addedTicket.fn).toBe('fn1');

        bus.addTicket('name', 'fn2');
        addedTicket = bus.getTicket('name');

        expect(addedTicket).toBeDefined();
        expect(addedTicket.name).toBe('name');
        expect(addedTicket.fn).toBe('fn2');
    });

    it('remove ticket', () => {
        bus.removeTicket('name');

        expect(bus.getTicketsLength()).toBe(0);

        bus.addTicket('name', () => {});

        bus.removeTicket('name');

        expect(bus.getTicketsLength()).toBe(0);

        bus.addTicket('1', () => {});
        bus.addTicket('2', () => {});

        bus.removeTicket('1');

        expect(bus.getTicketsLength()).toBe(1);

        bus.removeTicket('2');

        expect(bus.getTicketsLength()).toBe(0);
    });

    it('send', async(done) => {
        const nameChanged = async() => 201;
        const priorityChanged = async() => { throw 500; };

        bus.addTicket('nameChanged', () => nameChanged());
        bus.addTicket('priorityChanged', () => priorityChanged());

        const response = await bus.send();

        expect(response[0].success).toBeDefined();
        expect(response[0].success).toBe(201);
        expect(response[0].error).not.toBeDefined();

        expect(response[1].error).toBeDefined();
        expect(response[1].error).toBe(500);
        expect(response[1].success).not.toBeDefined();

        done();
    });

    it('get tickets length', () => {
        expect(bus.getTicketsLength()).toBe(0);
        bus.addTicket('name', () => {});
        expect(bus.getTicketsLength()).toBe(1);
        bus.removeTicket('name');
        expect(bus.getTicketsLength()).toBe(0);
    });
});
