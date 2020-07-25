"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("buffer/");
var sortJson_1 = require("../utils/sortJson");
var Msg = /** @class */ (function () {
    function Msg() {
    }
    /**
     * Get the canonical byte representation of the Msg.
     * @return Return sorted by alphabetically amino encoded json by default.
     */
    Msg.prototype.getSignBytes = function (codec) {
        return buffer_1.Buffer.from(sortJson_1.sortJSON(codec.marshalJson(this)), "utf8");
    };
    Msg.prototype.getSigners = function () {
        throw new Error("You should implement getSigners()");
    };
    return Msg;
}());
exports.Msg = Msg;
//# sourceMappingURL=tx.js.map