import { Context } from "./context";
import { AxiosInstance } from "axios";
import { TxEncoder, Msg } from "./tx";
import { TxBuilder, TxBuilderConfig } from "./txBuilder";
import { Bech32Config } from "./bech32Config";
import { Key, WalletProvider } from "./walletProvider";
import { TendermintRPC } from "../rpc/tendermint";
import { Rest } from "./rest";
import { QueryAccount } from "./account";
import { ResultBroadcastTx, ResultBroadcastTxCommit } from "../rpc/tx";
import { BIP44 } from "./bip44";
import { Codec } from "@node-a-team/ts-amino";
export interface ApiConfig {
    chainId: string;
    walletProvider: WalletProvider;
    /** Endpoint of rpc */
    rpc: string;
    /** Endpoint of rest api */
    rest: string;
}
export interface CoreConfig<R extends Rest> {
    /**
     * Encoder for transaction.
     */
    txEncoder: TxEncoder;
    /**
     * Builder for transaction.
     */
    txBuilder: TxBuilder;
    rpcInstanceFactory?: (rpc: string) => AxiosInstance;
    restInstanceFactory?: (rpc: string) => AxiosInstance;
    restFactory: (context: Context) => R;
    queryAccount: QueryAccount;
    bech32Config: Bech32Config;
    bip44: BIP44;
    registerCodec: (codec: Codec) => void;
}
export declare class Api<R extends Rest> {
    private _context;
    private _rpc;
    private _rest;
    constructor(config: ApiConfig, coreConfig: CoreConfig<R>);
    enable(): Promise<void>;
    getKeys(): Promise<Key[]>;
    /**
     * Send msgs.
     * @return If mode is commit, this will return [[ResultBroadcastTx]].
     * Or if mode is sync or async, this will return [[ResultBroadcastTxCommit]].
     */
    sendMsgs(msgs: Msg[], config: TxBuilderConfig, mode?: "commit" | "sync" | "async"): Promise<ResultBroadcastTx | ResultBroadcastTxCommit>;
    readonly context: Context;
    readonly wallet: WalletProvider;
    readonly rpc: TendermintRPC;
    readonly rest: R;
}
