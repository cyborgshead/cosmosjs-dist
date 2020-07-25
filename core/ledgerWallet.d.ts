import { Context } from "./context";
import { WalletProvider, Key } from "./walletProvider";
/**
 * This wallet provider provides a basic client interface to communicate with a Tendermint/Cosmos App running in a Ledger Nano S/X
 * Note: WebUSB support requires Cosmos app >= 1.5.3
 */
export declare class LedgerWalletProvider implements WalletProvider {
    readonly transport: "WebUSB" | "U2F" | "HID";
    readonly bech32PrefixAccAddr: string;
    private readonly account;
    private readonly index;
    private app;
    private path;
    private key;
    constructor(transport: "WebUSB" | "U2F" | "HID", bech32PrefixAccAddr: string, account?: number, index?: number);
    enable(context: Context): Promise<void>;
    getKeys(context: Context): Promise<Key[]>;
    sign(context: Context, bech32Address: string, message: Uint8Array): Promise<Uint8Array>;
}
