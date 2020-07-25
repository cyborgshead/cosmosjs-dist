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
var Field = ts_amino_1.Amino.Field, DefineType = ts_amino_1.Amino.DefineType;
var bech32_1 = __importDefault(require("bech32"));
var crypto_1 = require("../crypto");
var buffer_1 = require("buffer/");
var AccAddress = /** @class */ (function () {
    function AccAddress(address, bech32Prefix) {
        if (!bech32Prefix) {
            throw new Error("Empty bech32 prefix");
        }
        this.address = address instanceof crypto_1.Address ? address.toBytes() : address;
        this.bech32Prefix = bech32Prefix;
    }
    AccAddress_1 = AccAddress;
    /**
     * Parse the address from bech32.
     * @param bech32Addr bech32 address string.
     * @param prefix If prefix is not provided, parse the address without verifying with suggested prefix.
     */
    AccAddress.fromBech32 = function (bech32Addr, prefix) {
        if (prefix === "") {
            throw new Error("Empty bech32 prefix");
        }
        var _a = bech32_1.default.decode(bech32Addr), b32Prefix = _a.prefix, words = _a.words;
        if (prefix != null && b32Prefix !== prefix) {
            throw new Error("Prefix doesn't match");
        }
        return new AccAddress_1(bech32_1.default.fromWords(words), prefix != null ? prefix : b32Prefix);
    };
    AccAddress.prototype.toBech32 = function () {
        if (!this.bech32Prefix) {
            throw new Error("Empty bech32 prefix");
        }
        var words = bech32_1.default.toWords(buffer_1.Buffer.from(this.address));
        return bech32_1.default.encode(this.bech32Prefix, words);
    };
    AccAddress.prototype.toBytes = function () {
        return new Uint8Array(this.address);
    };
    AccAddress.prototype.marshalJSON = function () {
        return buffer_1.Buffer.from("\"" + this.toBech32() + "\"", "utf8");
    };
    var AccAddress_1;
    __decorate([
        Field.Array(0, { type: ts_amino_1.Type.Uint8 })
    ], AccAddress.prototype, "address", void 0);
    AccAddress = AccAddress_1 = __decorate([
        DefineType()
    ], AccAddress);
    return AccAddress;
}());
exports.AccAddress = AccAddress;
var ValAddress = /** @class */ (function () {
    function ValAddress(address, bech32Prefix) {
        if (!bech32Prefix) {
            throw new Error("Empty bech32 prefix");
        }
        this.address = address instanceof crypto_1.Address ? address.toBytes() : address;
        this.bech32Prefix = bech32Prefix;
    }
    ValAddress_1 = ValAddress;
    /**
     * Parse the address from bech32.
     * @param bech32Addr bech32 address string.
     * @param prefix If prefix is not provided, parse the address without verifying with suggested prefix.
     */
    ValAddress.fromBech32 = function (bech32Addr, prefix) {
        if (prefix === "") {
            throw new Error("Empty bech32 prefix");
        }
        var _a = bech32_1.default.decode(bech32Addr), b32Prefix = _a.prefix, words = _a.words;
        if (prefix != null && b32Prefix !== prefix) {
            throw new Error("Prefix doesn't match");
        }
        return new ValAddress_1(bech32_1.default.fromWords(words), prefix != null ? prefix : b32Prefix);
    };
    ValAddress.prototype.toBech32 = function () {
        if (!this.bech32Prefix) {
            throw new Error("Empty bech32 prefix");
        }
        var words = bech32_1.default.toWords(buffer_1.Buffer.from(this.address));
        return bech32_1.default.encode(this.bech32Prefix, words);
    };
    ValAddress.prototype.toBytes = function () {
        return new Uint8Array(this.address);
    };
    ValAddress.prototype.marshalJSON = function () {
        return buffer_1.Buffer.from("\"" + this.toBech32() + "\"", "utf8");
    };
    var ValAddress_1;
    __decorate([
        Field.Array(0, { type: ts_amino_1.Type.Uint8 })
    ], ValAddress.prototype, "address", void 0);
    ValAddress = ValAddress_1 = __decorate([
        DefineType()
    ], ValAddress);
    return ValAddress;
}());
exports.ValAddress = ValAddress;
var ConsAddress = /** @class */ (function () {
    function ConsAddress(address, bech32Prefix) {
        if (!bech32Prefix) {
            throw new Error("Empty bech32 prefix");
        }
        this.address = address instanceof crypto_1.Address ? address.toBytes() : address;
        this.bech32Prefix = bech32Prefix;
    }
    ConsAddress_1 = ConsAddress;
    /**
     * Parse the address from bech32.
     * @param bech32Addr bech32 address string.
     * @param prefix If prefix is not provided, parse the address without verifying with suggested prefix.
     */
    ConsAddress.fromBech32 = function (bech32Addr, prefix) {
        if (prefix === "") {
            throw new Error("Empty bech32 prefix");
        }
        var _a = bech32_1.default.decode(bech32Addr), b32Prefix = _a.prefix, words = _a.words;
        if (prefix != null && b32Prefix !== prefix) {
            throw new Error("Prefix doesn't match");
        }
        return new ConsAddress_1(bech32_1.default.fromWords(words), prefix != null ? prefix : b32Prefix);
    };
    ConsAddress.prototype.toBech32 = function () {
        if (!this.bech32Prefix) {
            throw new Error("Empty bech32 prefix");
        }
        var words = bech32_1.default.toWords(buffer_1.Buffer.from(this.address));
        return bech32_1.default.encode(this.bech32Prefix, words);
    };
    ConsAddress.prototype.toBytes = function () {
        return new Uint8Array(this.address);
    };
    ConsAddress.prototype.marshalJSON = function () {
        return buffer_1.Buffer.from("\"" + this.toBech32() + "\"", "utf8");
    };
    var ConsAddress_1;
    __decorate([
        Field.Array(0, { type: ts_amino_1.Type.Uint8 })
    ], ConsAddress.prototype, "address", void 0);
    ConsAddress = ConsAddress_1 = __decorate([
        DefineType()
    ], ConsAddress);
    return ConsAddress;
}());
exports.ConsAddress = ConsAddress;
//# sourceMappingURL=address.js.map