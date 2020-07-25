/**
 * This BIP defines a logical hierarchy for deterministic wallets.
 */
export declare class BIP44 {
    /**
     * Purpose is a constant set to 44' (or 0x8000002C) following the BIP43 recommendation.
     * It indicates that the subtree of this node is used according to this specification.
     * Hardened derivation is used at this level.
     */
    readonly purpose: number;
    /**
     * One master node (seed) can be used for unlimited number of independent cryptocoins such as Bitcoin, Litecoin or Namecoin. However, sharing the same space for various cryptocoins has some disadvantages.
     * This level creates a separate subtree for every cryptocoin, avoiding reusing addresses across cryptocoins and improving privacy issues.
     * Coin type is a constant, set for each cryptocoin. Cryptocoin developers may ask for registering unused number for their project.
     * The list of already allocated coin types is in the chapter "Registered coin types" below.
     * Hardened derivation is used at this level.
     */
    readonly coinType: number;
    /**
     * Constant 0 is used for external chain and constant 1 for internal chain (also known as change addresses).
     * External chain is used for addresses that are meant to be visible outside of the wallet (e.g. for receiving payments).
     * Internal chain is used for addresses which are not meant to be visible outside of the wallet and is used for return transaction change.
     */
    readonly change: number;
    constructor(purpose: number, coinType: number, change?: number);
    withChange(change: number): BIP44;
    /**
     * Return path
     * @param account Accounts are numbered from index 0 in sequentially increasing manner. This number is used as child index in BIP32 derivation.
     * Public derivation is used at this level.
     * @param index Addresses are numbered from index 0 in sequentially increasing manner. This number is used as child index in BIP32 derivation.
     * Public derivation is used at this level.
     */
    path(account: number, index: number): number[];
    pathString(account: number, index: number): string;
}
