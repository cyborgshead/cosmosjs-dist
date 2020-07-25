import { Address } from "../crypto";
export declare class AccAddress {
    /**
     * Parse the address from bech32.
     * @param bech32Addr bech32 address string.
     * @param prefix If prefix is not provided, parse the address without verifying with suggested prefix.
     */
    static fromBech32(bech32Addr: string, prefix?: string): AccAddress;
    private readonly address;
    readonly bech32Prefix: string;
    constructor(address: Uint8Array | Address, bech32Prefix: string);
    toBech32(): string;
    toBytes(): Uint8Array;
    marshalJSON(): Uint8Array;
}
export declare class ValAddress {
    /**
     * Parse the address from bech32.
     * @param bech32Addr bech32 address string.
     * @param prefix If prefix is not provided, parse the address without verifying with suggested prefix.
     */
    static fromBech32(bech32Addr: string, prefix?: string): ValAddress;
    private readonly address;
    readonly bech32Prefix: string;
    constructor(address: Uint8Array | Address, bech32Prefix: string);
    toBech32(): string;
    toBytes(): Uint8Array;
    marshalJSON(): Uint8Array;
}
export declare class ConsAddress {
    /**
     * Parse the address from bech32.
     * @param bech32Addr bech32 address string.
     * @param prefix If prefix is not provided, parse the address without verifying with suggested prefix.
     */
    static fromBech32(bech32Addr: string, prefix?: string): ConsAddress;
    private readonly address;
    readonly bech32Prefix: string;
    constructor(address: Uint8Array | Address, bech32Prefix: string);
    toBech32(): string;
    toBytes(): Uint8Array;
    marshalJSON(): Uint8Array;
}
