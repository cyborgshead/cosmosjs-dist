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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../core/api");
var rest_1 = require("./rest");
var CmnCdc = __importStar(require("../common/codec"));
var Bank = __importStar(require("../x/bank"));
var Distribution = __importStar(require("../x/distribution"));
var Gov = __importStar(require("../x/gov"));
var Slashing = __importStar(require("../x/slashing"));
var Staking = __importStar(require("../x/staking"));
var Link = __importStar(require("../x/link"));
var stdTx_1 = require("../common/stdTx");
var stdTxBuilder_1 = require("../common/stdTxBuilder");
var bip44_1 = require("../core/bip44");
var bech32Config_1 = require("../core/bech32Config");
var query_1 = require("../core/query");
var Crypto = __importStar(require("../crypto"));
var GaiaApi = /** @class */ (function (_super) {
    __extends(GaiaApi, _super);
    function GaiaApi(config, coreConfig) {
        if (coreConfig === void 0) { coreConfig = {}; }
        return _super.call(this, config, __assign({
            txEncoder: stdTx_1.defaultTxEncoder,
            txBuilder: stdTxBuilder_1.stdTxBuilder,
            restFactory: function (context) {
                return new rest_1.GaiaRest(context);
            },
            queryAccount: function (context, address) {
                return query_1.queryAccount(context.get("rpcInstance"), address, coreConfig.bech32Config
                    ? coreConfig.bech32Config.bech32PrefixAccAddr
                    : "cosmos");
            },
            bech32Config: bech32Config_1.defaultBech32Config("cosmos"),
            bip44: new bip44_1.BIP44(44, 118, 0),
            registerCodec: function (codec) {
                CmnCdc.registerCodec(codec);
                Crypto.registerCodec(codec);
                Bank.registerCodec(codec);
                Distribution.registerCodec(codec);
                Gov.registerCodec(codec);
                Slashing.registerCodec(codec);
                Staking.registerCodec(codec);
                Link.registerCodec(codec);
            }
        }, coreConfig)) || this;
    }
    return GaiaApi;
}(api_1.Api));
exports.GaiaApi = GaiaApi;
//# sourceMappingURL=api.js.map