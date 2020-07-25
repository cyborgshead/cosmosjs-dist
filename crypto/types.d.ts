export declare class Address {
    static fromBech32(prefix: string, bech32Addr: string): Address;
    private address;
    constructor(address: Uint8Array);
    toBech32(prefix: string): string;
    toBytes(): Uint8Array;
}
export interface PubKey {
    toAddress(): Address;
    /**
     * @returns Return amino encoded bytes (including prefix bytes for concrete type).
     */
    toBytes(): Uint8Array;
    /**
     * @returns Return bytes without type info.
     */
    serialize(): Uint8Array;
    verify(msg: Uint8Array, sig: Uint8Array): boolean;
    equals(pubKey: PubKey): boolean;
}
export interface PrivKey {
    /**
     * @returns Return amino encoded bytes (including prefix bytes for concrete type).
     */
    toBytes(): Uint8Array;
    /**
     * @returns Return bytes without type info.
     */
    serialize(): Uint8Array;
    sign(msg: Uint8Array): Uint8Array;
    toPubKey(): PubKey;
    equals(privKey: PrivKey): boolean;
}
