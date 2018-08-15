import {IBus, IBusRelay, IRelayResponse} from './IBus';

export class Bus implements IBus {
    relays: IBusRelay[];

    constructor() {
        this.relays = [];
    }

    public addRelay(name, fn): void {
        if (this.isRelayExists(name)) {
            this.removeRelay(name);
        }

        this.relays.push({
            name: name,
            fn: fn,
            success: null,
            error: null
        });
    }

    public removeRelay(name: string): void {
        const relay = this.getRelay(name);

        if (relay) {
            this.relays = this.relays.filter(r => r !== relay);
        }
    }

    public getRelays(): IBusRelay[] {
        return this.relays;
    }

    public getRelaysLength(): number {
        return this.getRelays().length;
    }

    public async send(): Promise<IRelayResponse[]> {
        for (const relay of this.relays) {
            try {
                relay.success = await relay.fn();
            } catch (error) {
                relay.error = error;
            }
        }

        const relayResponses = this.getRelayResponses();
        this.relays = [];
        return relayResponses;
    }

    public clear(): void {
        this.relays = [];
    }

    private getRelayResponses(): IRelayResponse[] {
        const relays = this.getRelays();
        return relays.map(i => {
            return {
                name: i.name,
                success: i.success,
                error: i.error
            }
        });
    }

    private isRelayExists(name): boolean {
        return !!this.relays.find(i => i.name === name);
    }

    private getRelay(name: string): IBusRelay {
        return this.relays.find(r => r.name === name);
    }
}
