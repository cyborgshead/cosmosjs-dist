import { Msg } from "../../core/tx";
import { AccAddress, ValAddress } from "../../common/address";
export declare class MsgUnjail extends Msg {
    validatorAddr: ValAddress;
    bech32PrefixAccAddr: string;
    constructor(validatorAddr: ValAddress, bech32PrefixAccAddr: string);
    validateBasic(): void;
    getSigners(): AccAddress[];
}
