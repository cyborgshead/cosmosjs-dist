"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This BIP defines a logical hierarchy for deterministic wallets.
 */
var BIP44 = /** @class */ (function () {
    function BIP44(purpose, coinType, change) {
        if (change === void 0) { change = 0; }
        this.purpose = purpose;
        this.coinType = coinType;
        this.change = change;
    }
    BIP44.prototype.withChange = function (change) {
        return new BIP44(this.purpose, this.coinType, change);
    };
    /**
     * Return path
     * @param account Accounts are numbered from index 0 in sequentially increasing manner. This number is used as child index in BIP32 derivation.
     * Public derivation is used at this level.
     * @param index Addresses are numbered from index 0 in sequentially increasing manner. This number is used as child index in BIP32 derivation.
     * Public derivation is used at this level.
     */
    BIP44.prototype.path = function (account, index) {
        if (this.purpose !== parseInt(this.purpose.toString(), 10)) {
            throw new Error("Purpose should be integer");
        }
        if (this.coinType !== parseInt(this.coinType.toString(), 10)) {
            throw new Error("CoinType should be integer");
        }
        if (account !== parseInt(account.toString(), 10)) {
            throw new Error("Account should be integer");
        }
        if (this.change !== parseInt(this.change.toString(), 10)) {
            throw new Error("Change should be integer");
        }
        if (index !== parseInt(index.toString(), 10)) {
            throw new Error("Index should be integer");
        }
        return [this.purpose, this.coinType, account, this.change, index];
    };
    BIP44.prototype.pathString = function (account, index) {
        var path = this.path(account, index);
        return "m/" + path[0] + "'/" + path[1] + "'/" + path[2] + "'/" + path[3] + "/" + path[4];
    };
    return BIP44;
}());
exports.BIP44 = BIP44;
//# sourceMappingURL=bip44.js.map