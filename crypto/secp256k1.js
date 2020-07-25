"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_amino_1 = require("@node-a-team/ts-amino");
var Field = ts_amino_1.Amino.Field, DefineType = ts_amino_1.Amino.DefineType, marshalBinaryBare = ts_amino_1.Amino.marshalBinaryBare;
var buffer_1 = require("buffer/");
var elliptic_1 = __importDefault(require("elliptic"));
var crypto_js_1 = __importDefault(require("crypto-js"));
var types_1 = require("./types");
var PrivKeySecp256k1 = /** @class */ (function () {
    function PrivKeySecp256k1(privKey) {
        this.privKey = privKey;
    }
    /**
     * @returns Return amino encoded bytes (including prefix bytes for concrete type).
     */
    PrivKeySecp256k1.prototype.toBytes = function () {
        return marshalBinaryBare(this);
    };
    /**
     * @returns Return bytes without type info.
     */
    PrivKeySecp256k1.prototype.serialize = function () {
        return new Uint8Array(this.privKey);
    };
    PrivKeySecp256k1.prototype.toPubKey = function () {
        var secp256k1 = new elliptic_1.default.ec("secp256k1");
        var key = secp256k1.keyFromPrivate(this.privKey);
        return new PubKeySecp256k1(new Uint8Array(key.getPublic().encodeCompressed("array")));
    };
    PrivKeySecp256k1.prototype.equals = function (privKey) {
        return this.toBytes().toString() === privKey.toBytes().toString();
    };
    PrivKeySecp256k1.prototype.sign = function (msg) {
        var secp256k1 = new elliptic_1.default.ec("secp256k1");
        var key = secp256k1.keyFromPrivate(this.privKey);
        var hash = crypto_js_1.default.SHA256(crypto_js_1.default.lib.WordArray.create(msg)).toString();
        var signature = key.sign(buffer_1.Buffer.from(hash, "hex"), {
            canonical: true
        });
        return new Uint8Array(signature.r.toArray().concat(signature.s.toArray()));
    };
    PrivKeySecp256k1.prototype.toString = function () {
        return buffer_1.Buffer.from(this.privKey).toString("hex");
    };
    __decorate([
        Field.Array(0, { type: ts_amino_1.Type.Uint8 })
    ], PrivKeySecp256k1.prototype, "privKey", void 0);
    PrivKeySecp256k1 = __decorate([
        DefineType()
    ], PrivKeySecp256k1);
    return PrivKeySecp256k1;
}());
exports.PrivKeySecp256k1 = PrivKeySecp256k1;
var PubKeySecp256k1 = /** @class */ (function () {
    function PubKeySecp256k1(pubKey) {
        this.pubKey = pubKey;
    }
    /**
     * @returns Return amino encoded bytes (including prefix bytes for concrete type).
     */
    PubKeySecp256k1.prototype.toBytes = function () {
        return marshalBinaryBare(this);
    };
    /**
     * @returns Return bytes without type info.
     */
    PubKeySecp256k1.prototype.serialize = function () {
        return new Uint8Array(this.pubKey);
    };
    PubKeySecp256k1.prototype.toAddress = function () {
        var hash = crypto_js_1.default.SHA256(crypto_js_1.default.lib.WordArray.create(this.pubKey)).toString();
        hash = crypto_js_1.default.RIPEMD160(crypto_js_1.default.enc.Hex.parse(hash)).toString();
        return new types_1.Address(buffer_1.Buffer.from(hash, "hex"));
    };
    PubKeySecp256k1.prototype.equals = function (pubKey) {
        return this.toBytes().toString() === pubKey.toBytes().toString();
    };
    PubKeySecp256k1.prototype.verify = function (msg, sig) {
        var secp256k1 = new elliptic_1.default.ec("secp256k1");
        var key = secp256k1.keyFromPublic(this.pubKey);
        var hash = crypto_js_1.default.SHA256(crypto_js_1.default.lib.WordArray.create(msg)).toString();
        var signature = {
            r: sig.slice(0, 32),
            s: sig.slice(32)
        };
        return key.verify(buffer_1.Buffer.from(hash, "hex"), signature);
    };
    PubKeySecp256k1.prototype.toString = function () {
        return buffer_1.Buffer.from(this.pubKey).toString("hex");
    };
    __decorate([
        Field.Array(0, { type: ts_amino_1.Type.Uint8 })
    ], PubKeySecp256k1.prototype, "pubKey", void 0);
    PubKeySecp256k1 = __decorate([
        DefineType()
    ], PubKeySecp256k1);
    return PubKeySecp256k1;
}());
exports.PubKeySecp256k1 = PubKeySecp256k1;
//# sourceMappingURL=secp256k1.js.map