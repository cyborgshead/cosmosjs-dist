import { PrivKey } from "../crypto";
import { RNG } from "../utils/key";
import { Context } from "./context";
import { BIP44 } from "./bip44";
import { TxBuilderConfig } from "./txBuilder";
export interface Key {
    bech32Address: string;
    address: Uint8Array;
    algo: string;
    pubKey: Uint8Array;
}
export interface WalletProvider {
    /**
     * Request access to the user's accounts. Wallet can ask the user to approve or deny access. If user deny access, it will throw error.
     */
    enable(context: Context): Promise<void>;
    /**
     * Get array of keys that includes bech32 address string, address bytes and public key from wallet if user have approved the access.
     */
    getKeys(context: Context): Promise<Key[]>;
    /**
     * Request tx builder config from provider.
     * This is optional method.
     * If provider supports this method, tx builder will request tx config with prefered tx config that is defined by developer who uses cosmosjs.
     * Received tx builder config can be changed in the client. The wallet provider must verify that it is the same as the tx builder config sent earlier or warn the user before signing.
     */
    getTxBuilderConfig?(context: Context, config: TxBuilderConfig): Promise<TxBuilderConfig>;
    /**
     * Request signature from matched address if user have approved the access.
     */
    sign(context: Context, bech32Address: string, message: Uint8Array): Promise<Uint8Array>;
}
/**
 * Using the this in the browser is not secure and should only be used for development purposes.
 * Use a secure vault outside of the context of the webpage to ensure security when signing transactions in production.
 */
export declare class LocalWalletProvider implements WalletProvider {
    readonly bech32PrefixAccAddr: string;
    private readonly mnemonic;
    private readonly account;
    private readonly index;
    private readonly rng?;
    static generateMnemonic(rng?: RNG): string;
    static getPrivKeyFromMnemonic(bip44: BIP44, mnemonic: string, account?: number, index?: number): PrivKey;
    private privKey?;
    constructor(bech32PrefixAccAddr: string, mnemonic?: string, account?: number, index?: number, rng?: RNG | undefined);
    enable(context: Context): Promise<void>;
    getKeys(context: Context): Promise<Key[]>;
    sign(context: Context, bech32Address: string, message: Uint8Array): Promise<Uint8Array>;
}
