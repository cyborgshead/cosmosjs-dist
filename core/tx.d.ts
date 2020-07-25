import { AccAddress } from "../common/address";
import { Codec } from "@node-a-team/ts-amino";
import { Context } from "./context";
export interface Tx {
    getMsgs(): Msg[];
    /**
     * ValidateBasic does a simple validation check that
     * doesn't require access to any other information.
     * You can throw error in this when tx is invalid.
     */
    validateBasic(): void;
}
export declare abstract class Msg {
    /**
     * ValidateBasic does a simple validation check that
     * doesn't require access to any other information.
     * You can throw error in this when msg is invalid.
     */
    abstract validateBasic(): void;
    /**
     * Get the canonical byte representation of the Msg.
     * @return Return sorted by alphabetically amino encoded json by default.
     */
    getSignBytes(codec: Codec): Uint8Array;
    getSigners(): AccAddress[];
}
export declare type TxEncoder = (conext: Context, tx: Tx) => Uint8Array;
