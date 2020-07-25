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
var big_integer_1 = __importDefault(require("big-integer"));
var ts_amino_1 = require("@node-a-team/ts-amino");
var int_1 = require("./int");
var Method = ts_amino_1.Amino.Method, DefineStruct = ts_amino_1.Amino.DefineStruct;
var Dec = /** @class */ (function () {
    /**
     * Create a new Dec from integer with decimal place at prec
     * @param int - Parse a number | bigInteger | string into a Dec.
     * If int is string and contains dot(.), prec is ignored and automatically calculated.
     * @param prec - Precision
     */
    function Dec(int, prec) {
        if (prec === void 0) { prec = 0; }
        if (typeof int === "string") {
            if (int.length === 0) {
                throw new Error("empty string");
            }
            if (!/^(-?\d+\.\d+)$|^(-?\d+)$/.test(int)) {
                throw new Error("invalid decimal: " + int);
            }
            if (int.indexOf(".") >= 0) {
                prec = int.length - int.indexOf(".") - 1;
                int = int.replace(".", "");
            }
            this.int = big_integer_1.default(int);
        }
        else if (typeof int === "number") {
            this.int = big_integer_1.default(int);
        }
        else if (int instanceof int_1.Int) {
            this.int = big_integer_1.default(int.toString());
        }
        else {
            this.int = big_integer_1.default(int);
        }
        this.int = this.int.multiply(Dec_1.calcPrecisionMultiplier(big_integer_1.default(prec)));
    }
    Dec_1 = Dec;
    Dec.calcPrecisionMultiplier = function (prec) {
        if (prec.lt(big_integer_1.default(0))) {
            throw new Error("Invalid prec");
        }
        if (prec.gt(Dec_1.precision)) {
            throw new Error("Too much precision");
        }
        if (Dec_1.precisionMultipliers[prec.toString()]) {
            return Dec_1.precisionMultipliers[prec.toString()];
        }
        var zerosToAdd = Dec_1.precision.minus(prec);
        var multiplier = big_integer_1.default(10).pow(zerosToAdd);
        Dec_1.precisionMultipliers[prec.toString()] = multiplier;
        return multiplier;
    };
    Dec.prototype.isZero = function () {
        return this.int.eq(big_integer_1.default(0));
    };
    Dec.prototype.isNegative = function () {
        return this.int.isNegative();
    };
    Dec.prototype.isPositive = function () {
        return this.int.isPositive();
    };
    Dec.prototype.equals = function (d2) {
        return this.int.eq(d2.int);
    };
    /**
     * Alias for the greater method.
     */
    Dec.prototype.gt = function (d2) {
        return this.int.gt(d2.int);
    };
    /**
     * Alias for the greaterOrEquals method.
     */
    Dec.prototype.gte = function (d2) {
        return this.int.geq(d2.int);
    };
    /**
     * Alias for the lesser method.
     */
    Dec.prototype.lt = function (d2) {
        return this.int.lt(d2.int);
    };
    /**
     * Alias for the lesserOrEquals method.
     */
    Dec.prototype.lte = function (d2) {
        return this.int.leq(d2.int);
    };
    /**
     * reverse the decimal sign.
     */
    Dec.prototype.neg = function () {
        return new Dec_1(this.int.negate(), Dec_1.precision.toJSNumber());
    };
    /**
     * Returns the absolute value of a decimals.
     */
    Dec.prototype.abs = function () {
        return new Dec_1(this.int.abs(), Dec_1.precision.toJSNumber());
    };
    Dec.prototype.add = function (d2) {
        return new Dec_1(this.int.add(d2.int), Dec_1.precision.toJSNumber());
    };
    Dec.prototype.sub = function (d2) {
        return new Dec_1(this.int.subtract(d2.int), Dec_1.precision.toJSNumber());
    };
    Dec.prototype.mul = function (d2) {
        return new Dec_1(this.mulRaw(d2).chopPrecisionAndRound(), Dec_1.precision.toJSNumber());
    };
    Dec.prototype.mulTruncate = function (d2) {
        return new Dec_1(this.mulRaw(d2).chopPrecisionAndTruncate(), Dec_1.precision.toJSNumber());
    };
    Dec.prototype.mulRaw = function (d2) {
        return new Dec_1(this.int.multiply(d2.int), Dec_1.precision.toJSNumber());
    };
    Dec.prototype.quo = function (d2) {
        return new Dec_1(this.quoRaw(d2).chopPrecisionAndRound(), Dec_1.precision.toJSNumber());
    };
    Dec.prototype.quoTruncate = function (d2) {
        return new Dec_1(this.quoRaw(d2).chopPrecisionAndTruncate(), Dec_1.precision.toJSNumber());
    };
    Dec.prototype.quoRoundUp = function (d2) {
        return new Dec_1(this.quoRaw(d2).chopPrecisionAndRoundUp(), Dec_1.precision.toJSNumber());
    };
    Dec.prototype.quoRaw = function (d2) {
        var precision = Dec_1.calcPrecisionMultiplier(big_integer_1.default(0));
        // multiply precision twice
        var mul = this.int.multiply(precision).multiply(precision);
        return new Dec_1(mul.divide(d2.int), Dec_1.precision.toJSNumber());
    };
    Dec.prototype.isInteger = function () {
        var precision = Dec_1.calcPrecisionMultiplier(big_integer_1.default(0));
        return this.int.remainder(precision).equals(big_integer_1.default(0));
    };
    /**
     * Remove a Precision amount of rightmost digits and perform bankers rounding
     * on the remainder (gaussian rounding) on the digits which have been removed.
     */
    Dec.prototype.chopPrecisionAndRound = function () {
        // Remove the negative and add it back when returning
        if (this.isNegative()) {
            var absoulteDec = this.abs();
            var choped = absoulteDec.chopPrecisionAndRound();
            return choped.negate();
        }
        var precision = Dec_1.calcPrecisionMultiplier(big_integer_1.default(0));
        var fivePrecision = precision.divide(big_integer_1.default(2));
        // Get the truncated quotient and remainder
        var _a = this.int.divmod(precision), quotient = _a.quotient, remainder = _a.remainder;
        // If remainder is zero
        if (remainder.equals(big_integer_1.default(0))) {
            return quotient;
        }
        if (remainder.lt(fivePrecision)) {
            return quotient;
        }
        else if (remainder.gt(fivePrecision)) {
            return quotient.add(big_integer_1.default(1));
        }
        else {
            // always round to an even number
            if (quotient.divide(big_integer_1.default(2)).equals(big_integer_1.default(0))) {
                return quotient;
            }
            else {
                return quotient.add(big_integer_1.default(1));
            }
        }
    };
    Dec.prototype.chopPrecisionAndRoundUp = function () {
        // Remove the negative and add it back when returning
        if (this.isNegative()) {
            var absoulteDec = this.abs();
            // truncate since d is negative...
            var choped = absoulteDec.chopPrecisionAndTruncate();
            return choped.negate();
        }
        var precision = Dec_1.calcPrecisionMultiplier(big_integer_1.default(0));
        // Get the truncated quotient and remainder
        var _a = this.int.divmod(precision), quotient = _a.quotient, remainder = _a.remainder;
        // If remainder is zero
        if (remainder.equals(big_integer_1.default(0))) {
            return quotient;
        }
        return quotient.add(big_integer_1.default(1));
    };
    /**
     * Similar to chopPrecisionAndRound, but always rounds down
     */
    Dec.prototype.chopPrecisionAndTruncate = function () {
        var precision = Dec_1.calcPrecisionMultiplier(big_integer_1.default(0));
        return this.int.divide(precision);
    };
    Dec.prototype.toString = function (prec) {
        if (prec === void 0) { prec = Dec_1.precision.toJSNumber(); }
        var precision = Dec_1.calcPrecisionMultiplier(big_integer_1.default(0));
        var int = this.int.abs();
        var _a = int.divmod(precision), interger = _a.quotient, fraction = _a.remainder;
        var fractionStr = fraction.toString(10);
        for (var i = 0, l = fractionStr.length; i < Dec_1.precision.toJSNumber() - l; i++) {
            fractionStr = "0" + fractionStr;
        }
        fractionStr = fractionStr.substring(0, prec);
        return ((this.isNegative() ? "-" : "") + interger.toString(10) + "." + fractionStr);
    };
    Dec.prototype.round = function () {
        return new int_1.Int(this.chopPrecisionAndRound());
    };
    Dec.prototype.roundUp = function () {
        return new int_1.Int(this.chopPrecisionAndRoundUp());
    };
    Dec.prototype.truncate = function () {
        return new int_1.Int(this.chopPrecisionAndTruncate());
    };
    Dec.prototype.marshalAmino = function () {
        return this.int.toString(10);
    };
    Dec.prototype.marshalJSON = function () {
        return "\"" + this.int.toString(10) + "\"";
    };
    var Dec_1;
    Dec.precision = big_integer_1.default(18);
    Dec.precisionMultipliers = {};
    __decorate([
        Method.AminoMarshaler({ type: ts_amino_1.Type.String })
    ], Dec.prototype, "marshalAmino", null);
    Dec = Dec_1 = __decorate([
        DefineStruct()
    ], Dec);
    return Dec;
}());
exports.Dec = Dec;
//# sourceMappingURL=decimal.js.map