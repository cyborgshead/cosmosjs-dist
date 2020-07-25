"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var secp256k1_1 = require("./secp256k1");
function registerCodec(codec) {
    codec.registerConcrete("tendermint/PrivKeySecp256k1", secp256k1_1.PrivKeySecp256k1.prototype);
    codec.registerConcrete("tendermint/PubKeySecp256k1", secp256k1_1.PubKeySecp256k1.prototype);
}
exports.registerCodec = registerCodec;
//# sourceMappingURL=codec.js.map