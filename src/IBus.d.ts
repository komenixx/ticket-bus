export interface IBus {
    relays: IBusRelay[];

    addRelay(name: string, fn: any): void;

    removeRelay(name: string): void;

    getRelays(): IBusRelay[];

    getRelaysLength(): number;

    clear(): void;

    send(): Promise<IRelayResponse[]>;
}

export interface IBusRelay {
    name: string;
    /**
     * Function which apply on bus send
     */
    fn: any;

    /**
     * Success response from then callback
     */
    success: any;

    /**
     * Error response from catch callback
     */
    error: IErrorResponse;
}

export interface IRelayResponse {
    name: string;

    /**
     * success response from API
     * if response is error, success is null
     */
    success: any;

    /**
     * error response from API
     * if response is success, error is null
     */
    error: any;
}

export interface IErrorResponse {}
