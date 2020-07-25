"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var msgs_1 = require("./msgs");
function registerCodec(codec) {
    codec.registerConcrete("cosmos-sdk/MsgSend", msgs_1.MsgSend.prototype);
}
exports.registerCodec = registerCodec;
//# sourceMappingURL=codec.js.map