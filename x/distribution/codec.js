"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var msgs_1 = require("./msgs");
function registerCodec(codec) {
    codec.registerConcrete("cosmos-sdk/MsgModifyWithdrawAddress", msgs_1.MsgSetWithdrawAddress.prototype);
    codec.registerConcrete("cosmos-sdk/MsgWithdrawDelegationReward", msgs_1.MsgWithdrawDelegatorReward.prototype);
    codec.registerConcrete("cosmos-sdk/MsgWithdrawValidatorCommission", msgs_1.MsgWithdrawValidatorCommission.prototype);
}
exports.registerCodec = registerCodec;
//# sourceMappingURL=codec.js.map