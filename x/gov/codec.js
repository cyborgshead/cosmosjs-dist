"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var msgs_1 = require("./msgs");
function registerCodec(codec) {
    codec.registerConcrete("cosmos-sdk/MsgSubmitProposal", msgs_1.MsgSubmitProposal.prototype);
    codec.registerConcrete("cosmos-sdk/MsgDeposit", msgs_1.MsgDeposit.prototype);
    codec.registerConcrete("cosmos-sdk/MsgVote", msgs_1.MsgVote.prototype);
}
exports.registerCodec = registerCodec;
//# sourceMappingURL=codec.js.map