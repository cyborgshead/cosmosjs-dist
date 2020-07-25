"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var address_1 = require("../common/address");
var key_1 = require("../utils/key");
/**
 * Using the this in the browser is not secure and should only be used for development purposes.
 * Use a secure vault outside of the context of the webpage to ensure security when signing transactions in production.
 */
var LocalWalletProvider = /** @class */ (function () {
    function LocalWalletProvider(bech32PrefixAccAddr, mnemonic, account, index, rng) {
        if (mnemonic === void 0) { mnemonic = ""; }
        if (account === void 0) { account = 0; }
        if (index === void 0) { index = 0; }
        this.bech32PrefixAccAddr = bech32PrefixAccAddr;
        this.mnemonic = mnemonic;
        this.account = account;
        this.index = index;
        this.rng = rng;
        if (this.mnemonic === "") {
            this.mnemonic = LocalWalletProvider.generateMnemonic(this.rng);
        }
    }
    LocalWalletProvider.generateMnemonic = function (rng) {
        if (!rng) {
            throw new Error("You should set rng to generate seed");
        }
        return key_1.generateSeed(rng);
    };
    LocalWalletProvider.getPrivKeyFromMnemonic = function (bip44, mnemonic, account, index) {
        if (account === void 0) { account = 0; }
        if (index === void 0) { index = 0; }
        return key_1.generateWalletFromMnemonic(mnemonic, bip44.pathString(account, index));
    };
    LocalWalletProvider.prototype.enable = function (context) {
        this.privKey = LocalWalletProvider.getPrivKeyFromMnemonic(context.get("bip44"), this.mnemonic, this.account, this.index);
        return Promise.resolve();
    };
    LocalWalletProvider.prototype.getKeys = function (context) {
        if (!this.privKey) {
            throw new Error("Not approved");
        }
        var pubKey = this.privKey.toPubKey();
        var address = this.privKey.toPubKey().toAddress();
        var bech32Address = new address_1.AccAddress(address, this.bech32PrefixAccAddr).toBech32();
        var key = {
            bech32Address: bech32Address,
            address: address.toBytes(),
            algo: "secp256k1",
            pubKey: pubKey.serialize()
        };
        return Promise.resolve([key]);
    };
    LocalWalletProvider.prototype.sign = function (context, bech32Address, message) {
        if (!this.privKey) {
            throw new Error("Not approved");
        }
        var pubKey = this.privKey.toPubKey();
        var address = pubKey.toAddress();
        var accAddress = new address_1.AccAddress(address, this.bech32PrefixAccAddr);
        if (accAddress.toBech32() !== bech32Address) {
            throw new Error("Unknown address: " + bech32Address);
        }
        return Promise.resolve(this.privKey.sign(message));
    };
    return LocalWalletProvider;
}());
exports.LocalWalletProvider = LocalWalletProvider;
//# sourceMappingURL=walletProvider.js.map