import { BaseAccount } from "../common/baseAccount";
import { AxiosInstance } from "axios";
export declare function queryAccount(rpcInstance: AxiosInstance, account: string | Uint8Array, bech32PrefixAccAddr?: string, options?: {
    querierRoute?: string;
    data?: string;
}): Promise<BaseAccount>;
