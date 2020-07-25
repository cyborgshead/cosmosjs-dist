"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var msgs_1 = require("./msgs");
function registerCodec(codec) {
    codec.registerConcrete("cyber/Link", msgs_1.MsgLink.prototype);
}
exports.registerCodec = registerCodec;
//# sourceMappingURL=codec.js.map