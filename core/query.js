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
Object.defineProperty(exports, "__esModule", { value: true });
var address_1 = require("../common/address");
var baseAccount_1 = require("../common/baseAccount");
function queryAccount(rpcInstance, account, bech32PrefixAccAddr, options) {
    return __awaiter(this, void 0, void 0, function () {
        var accAddress, result, r, response, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof account === "string" && !bech32PrefixAccAddr) {
                        throw new Error("Empty bech32 prefix");
                    }
                    accAddress = typeof account === "string"
                        ? address_1.AccAddress.fromBech32(account, bech32PrefixAccAddr)
                        : new address_1.AccAddress(account, bech32PrefixAccAddr);
                    return [4 /*yield*/, rpcInstance.get("abci_query", {
                            params: {
                                path: "0x" +
                                    Buffer.from("custom/" + (options && options.querierRoute ? options.querierRoute : "acc") + "/account").toString("hex"),
                                data: options && options.data
                                    ? options.data
                                    : "0x" +
                                        Buffer.from(JSON.stringify({
                                            Address: accAddress.toBech32()
                                        })).toString("hex")
                            }
                        })];
                case 1:
                    result = _a.sent();
                    if (result.status !== 200) {
                        throw new Error(result.statusText);
                    }
                    if (result.data) {
                        r = result.data;
                        if (r.result && r.result.response) {
                            response = r.result.response;
                            if (response.code !== undefined && response.code !== 0) {
                                throw new Error(response.log);
                            }
                            value = JSON.parse(Buffer.from(response.value, "base64").toString());
                            return [2 /*return*/, baseAccount_1.BaseAccount.fromJSON(value)];
                        }
                    }
                    throw new Error("Unknown error");
            }
        });
    });
}
exports.queryAccount = queryAccount;
//# sourceMappingURL=query.js.map