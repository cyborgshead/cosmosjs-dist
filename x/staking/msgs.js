"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_amino_1 = require("@node-a-team/ts-amino");
var Field = ts_amino_1.Amino.Field, DefineStruct = ts_amino_1.Amino.DefineStruct;
var tx_1 = require("../../core/tx");
var address_1 = require("../../common/address");
var Description = /** @class */ (function () {
    function Description(moniker, identity, website, details) {
        this.moniker = moniker;
        this.identity = identity;
        this.website = website;
        this.details = details;
    }
    __decorate([
        Field.String(0, {
            jsonName: "moniker"
        })
    ], Description.prototype, "moniker", void 0);
    __decorate([
        Field.String(1, {
            jsonName: "identity"
        })
    ], Description.prototype, "identity", void 0);
    __decorate([
        Field.String(2, {
            jsonName: "website"
        })
    ], Description.prototype, "website", void 0);
    __decorate([
        Field.String(3, {
            jsonName: "details"
        })
    ], Description.prototype, "details", void 0);
    Description = __decorate([
        DefineStruct()
    ], Description);
    return Description;
}());
exports.Description = Description;
var CommissionMsg = /** @class */ (function () {
    function CommissionMsg(rate, maxRate, maxChangeRate) {
        this.rate = rate;
        this.maxRate = maxRate;
        this.maxChangeRate = maxChangeRate;
    }
    __decorate([
        Field.Defined(0, {
            jsonName: "rate"
        })
    ], CommissionMsg.prototype, "rate", void 0);
    __decorate([
        Field.Defined(1, {
            jsonName: "max_rate"
        })
    ], CommissionMsg.prototype, "maxRate", void 0);
    __decorate([
        Field.Defined(2, {
            jsonName: "max_change_rate"
        })
    ], CommissionMsg.prototype, "maxChangeRate", void 0);
    CommissionMsg = __decorate([
        DefineStruct()
    ], CommissionMsg);
    return CommissionMsg;
}());
exports.CommissionMsg = CommissionMsg;
var MsgCreateValidator = /** @class */ (function (_super) {
    __extends(MsgCreateValidator, _super);
    function MsgCreateValidator(description, commission, minSelfDelegation, delegatorAddress, validatorAddress, pubKey, value) {
        var _this = _super.call(this) || this;
        _this.description = description;
        _this.commission = commission;
        _this.minSelfDelegation = minSelfDelegation;
        _this.delegatorAddress = delegatorAddress;
        _this.validatorAddress = validatorAddress;
        _this.pubKey = pubKey;
        _this.value = value;
        return _this;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    MsgCreateValidator.prototype.validateBasic = function () { };
    MsgCreateValidator.prototype.getSigners = function () {
        var addr = [this.delegatorAddress];
        if (this.delegatorAddress.toBytes().toString() !==
            this.validatorAddress.toBytes().toString()) {
            addr.push(new address_1.AccAddress(this.validatorAddress.toBytes(), this.delegatorAddress.bech32Prefix));
        }
        return addr;
    };
    __decorate([
        Field.Defined(0, {
            jsonName: "description"
        })
    ], MsgCreateValidator.prototype, "description", void 0);
    __decorate([
        Field.Defined(1, {
            jsonName: "commission"
        })
    ], MsgCreateValidator.prototype, "commission", void 0);
    __decorate([
        Field.Defined(2, {
            jsonName: "min_self_delegation"
        })
    ], MsgCreateValidator.prototype, "minSelfDelegation", void 0);
    __decorate([
        Field.Defined(3, {
            jsonName: "delegator_address"
        })
    ], MsgCreateValidator.prototype, "delegatorAddress", void 0);
    __decorate([
        Field.Defined(4, {
            jsonName: "validator_address"
        })
    ], MsgCreateValidator.prototype, "validatorAddress", void 0);
    __decorate([
        Field.Interface(5, {
            jsonName: "pubkey"
        })
    ], MsgCreateValidator.prototype, "pubKey", void 0);
    __decorate([
        Field.Defined(6, {
            jsonName: "value"
        })
    ], MsgCreateValidator.prototype, "value", void 0);
    MsgCreateValidator = __decorate([
        DefineStruct()
    ], MsgCreateValidator);
    return MsgCreateValidator;
}(tx_1.Msg));
exports.MsgCreateValidator = MsgCreateValidator;
var MsgEditValidator = /** @class */ (function (_super) {
    __extends(MsgEditValidator, _super);
    function MsgEditValidator(description, validatorAddress, commisionRate, minSelfDelegation, bech32PrefixAccAddr) {
        var _this = _super.call(this) || this;
        _this.description = description;
        _this.validatorAddress = validatorAddress;
        _this.commisionRate = commisionRate;
        _this.minSelfDelegation = minSelfDelegation;
        _this.bech32PrefixAccAddr = bech32PrefixAccAddr;
        return _this;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    MsgEditValidator.prototype.validateBasic = function () { };
    MsgEditValidator.prototype.getSigners = function () {
        return [
            new address_1.AccAddress(this.validatorAddress.toBytes(), this.bech32PrefixAccAddr)
        ];
    };
    __decorate([
        Field.Defined(0, {
            jsonName: "description"
        })
    ], MsgEditValidator.prototype, "description", void 0);
    __decorate([
        Field.Defined(1, {
            jsonName: "address"
        })
    ], MsgEditValidator.prototype, "validatorAddress", void 0);
    __decorate([
        Field.Defined(2, {
            jsonName: "commission_rate"
        })
    ], MsgEditValidator.prototype, "commisionRate", void 0);
    __decorate([
        Field.Defined(3, {
            jsonName: "min_self_delegation"
        })
    ], MsgEditValidator.prototype, "minSelfDelegation", void 0);
    MsgEditValidator = __decorate([
        DefineStruct()
    ], MsgEditValidator);
    return MsgEditValidator;
}(tx_1.Msg));
exports.MsgEditValidator = MsgEditValidator;
var MsgDelegate = /** @class */ (function (_super) {
    __extends(MsgDelegate, _super);
    function MsgDelegate(delegatorAddress, validatorAddress, amount) {
        var _this = _super.call(this) || this;
        _this.delegatorAddress = delegatorAddress;
        _this.validatorAddress = validatorAddress;
        _this.amount = amount;
        return _this;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    MsgDelegate.prototype.validateBasic = function () { };
    MsgDelegate.prototype.getSigners = function () {
        return [this.delegatorAddress];
    };
    __decorate([
        Field.Defined(0, {
            jsonName: "delegator_address"
        })
    ], MsgDelegate.prototype, "delegatorAddress", void 0);
    __decorate([
        Field.Defined(1, {
            jsonName: "validator_address"
        })
    ], MsgDelegate.prototype, "validatorAddress", void 0);
    __decorate([
        Field.Defined(2, {
            jsonName: "amount"
        })
    ], MsgDelegate.prototype, "amount", void 0);
    MsgDelegate = __decorate([
        DefineStruct()
    ], MsgDelegate);
    return MsgDelegate;
}(tx_1.Msg));
exports.MsgDelegate = MsgDelegate;
var MsgBeginRedelegate = /** @class */ (function (_super) {
    __extends(MsgBeginRedelegate, _super);
    function MsgBeginRedelegate(delegatorAddress, validatorSrcAddress, validatorDstAddress, amount) {
        var _this = _super.call(this) || this;
        _this.delegatorAddress = delegatorAddress;
        _this.validatorSrcAddress = validatorSrcAddress;
        _this.validatorDstAddress = validatorDstAddress;
        _this.amount = amount;
        return _this;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    MsgBeginRedelegate.prototype.validateBasic = function () { };
    MsgBeginRedelegate.prototype.getSigners = function () {
        return [this.delegatorAddress];
    };
    __decorate([
        Field.Defined(0, {
            jsonName: "delegator_address"
        })
    ], MsgBeginRedelegate.prototype, "delegatorAddress", void 0);
    __decorate([
        Field.Defined(1, {
            jsonName: "validator_src_address"
        })
    ], MsgBeginRedelegate.prototype, "validatorSrcAddress", void 0);
    __decorate([
        Field.Defined(2, {
            jsonName: "validator_dst_address"
        })
    ], MsgBeginRedelegate.prototype, "validatorDstAddress", void 0);
    __decorate([
        Field.Defined(3, {
            jsonName: "amount"
        })
    ], MsgBeginRedelegate.prototype, "amount", void 0);
    MsgBeginRedelegate = __decorate([
        DefineStruct()
    ], MsgBeginRedelegate);
    return MsgBeginRedelegate;
}(tx_1.Msg));
exports.MsgBeginRedelegate = MsgBeginRedelegate;
var MsgUndelegate = /** @class */ (function (_super) {
    __extends(MsgUndelegate, _super);
    function MsgUndelegate(delegatorAddress, validatorAddress, amount) {
        var _this = _super.call(this) || this;
        _this.delegatorAddress = delegatorAddress;
        _this.validatorAddress = validatorAddress;
        _this.amount = amount;
        return _this;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    MsgUndelegate.prototype.validateBasic = function () { };
    MsgUndelegate.prototype.getSigners = function () {
        return [this.delegatorAddress];
    };
    __decorate([
        Field.Defined(0, {
            jsonName: "delegator_address"
        })
    ], MsgUndelegate.prototype, "delegatorAddress", void 0);
    __decorate([
        Field.Defined(1, {
            jsonName: "validator_address"
        })
    ], MsgUndelegate.prototype, "validatorAddress", void 0);
    __decorate([
        Field.Defined(2, {
            jsonName: "amount"
        })
    ], MsgUndelegate.prototype, "amount", void 0);
    MsgUndelegate = __decorate([
        DefineStruct()
    ], MsgUndelegate);
    return MsgUndelegate;
}(tx_1.Msg));
exports.MsgUndelegate = MsgUndelegate;
//# sourceMappingURL=msgs.js.map