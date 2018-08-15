/// <reference path="../node_modules/@types/jasmine/index.d.ts" />
import {IBus} from '../src/IBus';
import {Bus} from '../src/Bus';

describe('Bus', () => {
    let bus: IBus;

    beforeEach(() => {
        bus = new Bus();
    });

    it('add relay', () => {
        let relays = [];
        bus.addRelay('name', 'fn1');

        relays = bus.getRelays();

        expect(relays.length).toBe(1);
        expect(relays[0]).toBeDefined();
        expect(relays[0].name).toBe('name');
        expect(relays[0].fn).toBe('fn1');

        bus.addRelay('name2', 'fn2');

        relays = bus.getRelays();

        expect(relays.length).toBe(2);

        bus.addRelay('name2', 'fn2');

        relays = bus.getRelays();

        expect(relays.length).toBe(2);

        expect(relays[1]).toBeDefined();
        expect(relays[1].name).toBe('name2');
        expect(relays[1].fn).toBe('fn2');
    });

    it('remove relay', () => {
        bus.removeRelay('name');

        expect(bus.getRelaysLength()).toBe(0);

        bus.addRelay('name', () => {});
        bus.removeRelay('name');

        expect(bus.getRelaysLength()).toBe(0);

        bus.addRelay('1', () => {});
        bus.addRelay('2', () => {});

        bus.removeRelay('1');

        expect(bus.getRelaysLength()).toBe(1);

        bus.removeRelay('2');

        expect(bus.getRelaysLength()).toBe(0);
    });

    it('send', async() => {
        const nameChanged = async() => 201;
        const priorityChanged = async() => { throw 500; };

        bus.addRelay('nameChanged', () => nameChanged());
        bus.addRelay('priorityChanged', () => priorityChanged());

        const response = await bus.send();

        console.log(response);

        expect(response[0].success).toBeDefined();
        expect(response[0].success).toBe(201);
        expect(response[0].error).toBe(null);

        expect(response[1].error).toBeDefined();
        expect(response[1].error).toBe(500);
        expect(response[1].success).toBe(null);

        return;
    });

    it('get relays', () => {
        expect(bus.getRelays.length).toBe(0);
        bus.addRelay('name', () => {});
        expect(bus.getRelaysLength()).toBe(1);
        bus.removeRelay('name');
        expect(bus.getRelaysLength()).toBe(0);
    });

    it('get relays length', () => {
        expect(bus.getRelaysLength()).toBe(0);
        bus.addRelay('name', () => {});
        expect(bus.getRelaysLength()).toBe(1);
        bus.removeRelay('name');
        expect(bus.getRelaysLength()).toBe(0);
    });

    it('clear', () => {
        bus.addRelay('name', () => {});
        expect(bus.getRelaysLength()).toBe(1);
        bus.clear();
        expect(bus.getRelaysLength()).toBe(0);
    });
});
