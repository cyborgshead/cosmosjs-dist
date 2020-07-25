"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var stdTx_1 = require("./stdTx");
var big_integer_1 = __importDefault(require("big-integer"));
var crypto_1 = require("../crypto");
var coin_1 = require("./coin");
function nullableBnToBI(bn) {
    var result = big_integer_1.default(-1);
    if (bn) {
        if (typeof bn === "string") {
            result = big_integer_1.default(bn);
        }
        else if (typeof bn === "number") {
            result = big_integer_1.default(bn);
        }
        else {
            result = big_integer_1.default(bn);
        }
    }
    return result;
}
exports.stdTxBuilder = function (context, msgs, config) { return __awaiter(_this, void 0, void 0, function () {
    var walletProvider, tempFee, i, fee_1, configFee, fee, stdFee, seenSigners, signers, _i, msgs_1, msg, _a, _b, signer, keys, signatures, _c, signers_1, signer, accountNumber, sequence, account, signDoc, sig, pubKey, _d, keys_1, key, signature, stdTx;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                walletProvider = context.get("walletProvider");
                if (!walletProvider.getTxBuilderConfig) return [3 /*break*/, 2];
                return [4 /*yield*/, walletProvider.getTxBuilderConfig(context, config)];
            case 1:
                config = _e.sent();
                tempFee = config.fee;
                if (Array.isArray(tempFee)) {
                    for (i = 0; i < tempFee.length; i++) {
                        if (!(tempFee[i] instanceof coin_1.Coin)) {
                            fee_1 = tempFee[i];
                            configFee = config.fee;
                            configFee[i] = new coin_1.Coin(fee_1.denom, big_integer_1.default(fee_1.amount.toString()));
                        }
                    }
                }
                else {
                    if (!(tempFee instanceof coin_1.Coin)) {
                        config.fee = new coin_1.Coin(tempFee.denom, big_integer_1.default(tempFee.amount.toString()));
                    }
                }
                config.gas = big_integer_1.default(config.gas.toString());
                if (config.sequence) {
                    config.sequence = big_integer_1.default(config.sequence.toString());
                }
                if (config.accountNumber) {
                    config.accountNumber = big_integer_1.default(config.accountNumber.toString());
                }
                _e.label = 2;
            case 2:
                fee = [];
                if (!Array.isArray(config.fee)) {
                    fee = [config.fee];
                }
                else {
                    fee = config.fee;
                }
                stdFee = new stdTx_1.StdFee(fee, config.gas);
                seenSigners = {};
                signers = [];
                for (_i = 0, msgs_1 = msgs; _i < msgs_1.length; _i++) {
                    msg = msgs_1[_i];
                    msg.validateBasic();
                    for (_a = 0, _b = msg.getSigners(); _a < _b.length; _a++) {
                        signer = _b[_a];
                        if (!seenSigners[signer.toBytes().toString()]) {
                            signers.push(signer);
                            seenSigners[signer.toBytes().toString()] = true;
                        }
                    }
                }
                return [4 /*yield*/, walletProvider.getKeys(context)];
            case 3:
                keys = _e.sent();
                signatures = [];
                _c = 0, signers_1 = signers;
                _e.label = 4;
            case 4:
                if (!(_c < signers_1.length)) return [3 /*break*/, 9];
                signer = signers_1[_c];
                accountNumber = nullableBnToBI(config.accountNumber);
                sequence = nullableBnToBI(config.sequence);
                if (!(accountNumber.lt(big_integer_1.default(0)) || sequence.lt(big_integer_1.default(0)))) return [3 /*break*/, 6];
                return [4 /*yield*/, context.get("queryAccount")(context, signers[0].toBech32())];
            case 5:
                account = _e.sent();
                if (accountNumber.lt(big_integer_1.default(0))) {
                    accountNumber = account.getAccountNumber();
                }
                if (sequence.lt(big_integer_1.default(0))) {
                    sequence = account.getSequence();
                }
                _e.label = 6;
            case 6:
                signDoc = new stdTx_1.StdSignDoc(context.get("codec"), accountNumber, context.get("chainId"), stdFee, config.memo, msgs, sequence);
                return [4 /*yield*/, walletProvider.sign(context, signer.toBech32(), signDoc.getSignBytes())];
            case 7:
                sig = _e.sent();
                pubKey = void 0;
                for (_d = 0, keys_1 = keys; _d < keys_1.length; _d++) {
                    key = keys_1[_d];
                    if (key.bech32Address === signer.toBech32()) {
                        if (key.algo === "secp256k1") {
                            pubKey = new crypto_1.PubKeySecp256k1(key.pubKey);
                        }
                        else {
                            throw new Error("Unsupported algo: " + key.algo);
                        }
                    }
                }
                signature = new stdTx_1.StdSignature(pubKey, sig);
                signatures.push(signature);
                _e.label = 8;
            case 8:
                _c++;
                return [3 /*break*/, 4];
            case 9:
                stdTx = new stdTx_1.StdTx(msgs, stdFee, signatures, config.memo);
                stdTx.validateBasic();
                return [2 /*return*/, stdTx];
        }
    });
}); };
//# sourceMappingURL=stdTxBuilder.js.map