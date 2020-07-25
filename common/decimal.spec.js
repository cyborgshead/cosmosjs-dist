"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
require("mocha");
var decimal_1 = require("./decimal");
var int_1 = require("./int");
describe("Test decimals", function () {
    it("dec should be parsed from str properly", function () {
        var dec = new decimal_1.Dec("10.009");
        assert_1.default.strictEqual(dec.toString(), "10.009000000000000000");
        assert_1.default.strictEqual(dec.toString(2), "10.00");
        dec = new decimal_1.Dec("-123.45678900");
        assert_1.default.strictEqual(dec.toString(), "-123.456789000000000000");
        assert_1.default.strictEqual(dec.toString(3), "-123.456");
        dec = new decimal_1.Dec("10");
        assert_1.default.strictEqual(dec.toString(), "10.000000000000000000");
        assert_1.default.throws(function () {
            new decimal_1.Dec("");
        });
        assert_1.default.throws(function () {
            new decimal_1.Dec("0.-75");
        });
        assert_1.default.throws(function () {
            new decimal_1.Dec("0.489234893284938249348923849283408");
        });
        assert_1.default.throws(function () {
            new decimal_1.Dec("foobar");
        });
        assert_1.default.throws(function () {
            new decimal_1.Dec("0.foobar");
        });
        assert_1.default.throws(function () {
            new decimal_1.Dec("foobar.0");
        });
    });
    it("dec should be caculated properly", function () {
        var tests = [
            {
                d1: new decimal_1.Dec(0),
                d2: new decimal_1.Dec(0),
                expMul: new decimal_1.Dec(0),
                expMulTruncate: new decimal_1.Dec(0),
                expQuo: new decimal_1.Dec(0),
                expQuoRoundUp: new decimal_1.Dec(0),
                expQuoTruncate: new decimal_1.Dec(0),
                expAdd: new decimal_1.Dec(0),
                expSub: new decimal_1.Dec(0)
            },
            {
                d1: new decimal_1.Dec(0),
                d2: new decimal_1.Dec(1),
                expMul: new decimal_1.Dec(0),
                expMulTruncate: new decimal_1.Dec(0),
                expQuo: new decimal_1.Dec(0),
                expQuoRoundUp: new decimal_1.Dec(0),
                expQuoTruncate: new decimal_1.Dec(0),
                expAdd: new decimal_1.Dec(1),
                expSub: new decimal_1.Dec(-1)
            },
            {
                d1: new decimal_1.Dec(-1),
                d2: new decimal_1.Dec(0),
                expMul: new decimal_1.Dec(0),
                expMulTruncate: new decimal_1.Dec(0),
                expQuo: new decimal_1.Dec(0),
                expQuoRoundUp: new decimal_1.Dec(0),
                expQuoTruncate: new decimal_1.Dec(0),
                expAdd: new decimal_1.Dec(-1),
                expSub: new decimal_1.Dec(-1)
            },
            {
                d1: new decimal_1.Dec(-1),
                d2: new decimal_1.Dec(1),
                expMul: new decimal_1.Dec(-1),
                expMulTruncate: new decimal_1.Dec(-1),
                expQuo: new decimal_1.Dec(-1),
                expQuoRoundUp: new decimal_1.Dec(-1),
                expQuoTruncate: new decimal_1.Dec(-1),
                expAdd: new decimal_1.Dec(0),
                expSub: new decimal_1.Dec(-2)
            },
            {
                d1: new decimal_1.Dec(3),
                d2: new decimal_1.Dec(7),
                expMul: new decimal_1.Dec(21),
                expMulTruncate: new decimal_1.Dec(21),
                expQuo: new decimal_1.Dec("428571428571428571", 18),
                expQuoRoundUp: new decimal_1.Dec("428571428571428572", 18),
                expQuoTruncate: new decimal_1.Dec("428571428571428571", 18),
                expAdd: new decimal_1.Dec(10),
                expSub: new decimal_1.Dec(-4)
            },
            {
                d1: new decimal_1.Dec(100),
                d2: new decimal_1.Dec(100),
                expMul: new decimal_1.Dec(10000),
                expMulTruncate: new decimal_1.Dec(10000),
                expQuo: new decimal_1.Dec(1),
                expQuoRoundUp: new decimal_1.Dec(1),
                expQuoTruncate: new decimal_1.Dec(1),
                expAdd: new decimal_1.Dec(200),
                expSub: new decimal_1.Dec(0)
            },
            {
                d1: new decimal_1.Dec(3333, 4),
                d2: new decimal_1.Dec(333, 4),
                expMul: new decimal_1.Dec(1109889, 8),
                expMulTruncate: new decimal_1.Dec(1109889, 8),
                expQuo: new decimal_1.Dec("10.009009009009009009"),
                expQuoRoundUp: new decimal_1.Dec("10.009009009009009010"),
                expQuoTruncate: new decimal_1.Dec("10.009009009009009009"),
                expAdd: new decimal_1.Dec(3666, 4),
                expSub: new decimal_1.Dec(3, 1)
            }
        ];
        var _loop_1 = function (test_1) {
            var resAdd = test_1.d1.add(test_1.d2);
            var resSub = test_1.d1.sub(test_1.d2);
            var resMul = test_1.d1.mul(test_1.d2);
            var resMulTruncate = test_1.d1.mulTruncate(test_1.d2);
            assert_1.default.strictEqual(resAdd.toString(), test_1.expAdd.toString(), "invalid result of add");
            assert_1.default.strictEqual(resSub.toString(), test_1.expSub.toString(), "invalid result of sub");
            assert_1.default.strictEqual(resMul.toString(), test_1.expMul.toString(), "invalid result of mul");
            assert_1.default.strictEqual(resMulTruncate.toString(), test_1.expMulTruncate.toString(), "invalid result of mul");
            if (test_1.d2.isZero()) {
                assert_1.default.throws(function () {
                    test_1.d1.quo(test_1.d2);
                });
            }
            else {
                var resQuo = test_1.d1.quo(test_1.d2);
                var resQuoRoundUp = test_1.d1.quoRoundUp(test_1.d2);
                var resQuoTruncate = test_1.d1.quoTruncate(test_1.d2);
                assert_1.default.strictEqual(resQuo.toString(), test_1.expQuo.toString(), "invalid result of quo");
                assert_1.default.strictEqual(resQuoRoundUp.toString(), test_1.expQuoRoundUp.toString(), "invalid result of quo round up");
                assert_1.default.strictEqual(resQuoTruncate.toString(), test_1.expQuoTruncate.toString(), "invalid result of quo truncate");
            }
        };
        for (var _i = 0, tests_1 = tests; _i < tests_1.length; _i++) {
            var test_1 = tests_1[_i];
            _loop_1(test_1);
        }
    });
    it("dec should be round up properly", function () {
        var tests = [
            {
                d1: new decimal_1.Dec("0.25"),
                exp: new int_1.Int("0")
            },
            {
                d1: new decimal_1.Dec("0"),
                exp: new int_1.Int("0")
            },
            {
                d1: new decimal_1.Dec("1"),
                exp: new int_1.Int("1")
            },
            {
                d1: new decimal_1.Dec("0.75"),
                exp: new int_1.Int("1")
            },
            {
                d1: new decimal_1.Dec("0.5"),
                exp: new int_1.Int("0")
            },
            {
                d1: new decimal_1.Dec("7.5"),
                exp: new int_1.Int("8")
            },
            {
                d1: new decimal_1.Dec("0.545"),
                exp: new int_1.Int("1")
            },
            {
                d1: new decimal_1.Dec("1.545"),
                exp: new int_1.Int("2")
            }
        ];
        for (var _i = 0, tests_2 = tests; _i < tests_2.length; _i++) {
            var test_2 = tests_2[_i];
            var resNeg = test_2.d1.neg().round();
            assert_1.default.strictEqual(resNeg.toString(), test_2.exp.neg().toString());
            var resPos = test_2.d1.round();
            assert_1.default.strictEqual(resPos.toString(), test_2.exp.toString());
        }
    });
    it("dec should be round up truncated", function () {
        var tests = [
            {
                d1: new decimal_1.Dec("0"),
                exp: new int_1.Int("0")
            },
            {
                d1: new decimal_1.Dec("0.25"),
                exp: new int_1.Int("0")
            },
            {
                d1: new decimal_1.Dec("0.75"),
                exp: new int_1.Int("0")
            },
            {
                d1: new decimal_1.Dec("1"),
                exp: new int_1.Int("1")
            },
            {
                d1: new decimal_1.Dec("7.5"),
                exp: new int_1.Int("7")
            },
            {
                d1: new decimal_1.Dec("7.6"),
                exp: new int_1.Int("7")
            },
            {
                d1: new decimal_1.Dec("8.5"),
                exp: new int_1.Int("8")
            },
            {
                d1: new decimal_1.Dec("100.000000001"),
                exp: new int_1.Int("100")
            }
        ];
        for (var _i = 0, tests_3 = tests; _i < tests_3.length; _i++) {
            var test_3 = tests_3[_i];
            var resNeg = test_3.d1.neg().truncate();
            assert_1.default.strictEqual(resNeg.toString(), test_3.exp.neg().toString());
            var resPos = test_3.d1.truncate();
            assert_1.default.strictEqual(resPos.toString(), test_3.exp.toString());
        }
    });
});
//# sourceMappingURL=decimal.spec.js.map