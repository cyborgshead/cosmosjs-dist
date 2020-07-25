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
var Link = /** @class */ (function () {
    function Link(from, to) {
        this.from = from;
        this.to = to;
    }
    __decorate([
        Field.String(0)
    ], Link.prototype, "from", void 0);
    __decorate([
        Field.String(1)
    ], Link.prototype, "to", void 0);
    Link = __decorate([
        DefineStruct()
    ], Link);
    return Link;
}());
exports.Link = Link;
var MsgLink = /** @class */ (function (_super) {
    __extends(MsgLink, _super);
    function MsgLink(address, links) {
        var _this = _super.call(this) || this;
        _this.address = address;
        _this.links = links;
        return _this;
    }
    MsgLink.prototype.getSigners = function () {
        return [this.address];
    };
    MsgLink.prototype.validateBasic = function () {
        for (var _i = 0, _a = this.links; _i < _a.length; _i++) {
            var link = _a[_i];
            // TODO improve validation
            if (link.from.length == 0 || link.to.length == 0) {
                throw new Error("CID is empty");
            }
        }
    };
    __decorate([
        Field.Defined(0, {
            jsonName: "address"
        })
    ], MsgLink.prototype, "address", void 0);
    __decorate([
        Field.Slice(1, { type: ts_amino_1.Type.Defined }, {
            jsonName: "links"
        })
    ], MsgLink.prototype, "links", void 0);
    MsgLink = __decorate([
        DefineStruct()
    ], MsgLink);
    return MsgLink;
}(tx_1.Msg));
exports.MsgLink = MsgLink;
//# sourceMappingURL=msgs.js.map