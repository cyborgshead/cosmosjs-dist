"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var msgs_1 = require("./msgs");
function registerCodec(codec) {
    codec.registerConcrete("cosmos-sdk/MsgCreateValidator", msgs_1.MsgCreateValidator.prototype);
    codec.registerConcrete("cosmos-sdk/MsgEditValidator", msgs_1.MsgEditValidator.prototype);
    codec.registerConcrete("cosmos-sdk/MsgDelegate", msgs_1.MsgDelegate.prototype);
    codec.registerConcrete("cosmos-sdk/MsgBeginRedelegate", msgs_1.MsgBeginRedelegate.prototype);
    codec.registerConcrete("cosmos-sdk/MsgUndelegate", msgs_1.MsgUndelegate.prototype);
}
exports.registerCodec = registerCodec;
//# sourceMappingURL=codec.js.map