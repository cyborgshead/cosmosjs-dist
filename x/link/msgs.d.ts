import { Msg } from "../../core/tx";
import { AccAddress } from "../../common/address";
export declare class Link {
    from: string;
    to: string;
    constructor(from: string, to: string);
}
export declare class MsgLink extends Msg {
    address: AccAddress;
    links: Link[];
    constructor(address: AccAddress, links: Link[]);
    getSigners(): AccAddress[];
    validateBasic(): void;
}
