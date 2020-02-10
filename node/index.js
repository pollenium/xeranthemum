"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
var crypto_1 = require("crypto");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var prompt_promise_1 = __importDefault(require("prompt-promise"));
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_ilex_1 = require("pollenium-ilex");
var pollenium_forgetmenot_1 = require("pollenium-forgetmenot");
var salt = pollenium_uvaursi_1.Uu.fromHexish('830a46600f948915d616413455e14c7d6dc08845128cd7a5f93777af5601060d');
var iterations = Number.MAX_SAFE_INTEGER;
var keyLength = 32;
var digest = 'sha256';
var forgetmenot = new pollenium_forgetmenot_1.Forgetmenot(__dirname + "/../addresses");
function computePrivateKey(struct) {
    return __awaiter(this, void 0, void 0, function () {
        var knowUtf8, haveUtf8, know, have, knowAndhave;
        return __generator(this, function (_a) {
            knowUtf8 = struct.knowUtf8, haveUtf8 = struct.haveUtf8;
            know = pollenium_uvaursi_1.Uu.fromUtf8(knowUtf8.trim());
            have = pollenium_uvaursi_1.Uu.fromUtf8(haveUtf8.trim());
            knowAndhave = pollenium_uvaursi_1.Uu.genConcat([know, have]);
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    crypto_1.pbkdf2(knowAndhave.u, salt.u, iterations, keyLength, digest, function (error, derivedKey) {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(new pollenium_buttercup_1.Bytes32(derivedKey));
                    });
                })];
        });
    });
}
exports.computePrivateKey = computePrivateKey;
function promptComputePrivateKey() {
    return __awaiter(this, void 0, void 0, function () {
        var knowUtf8, haveUtf8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prompt_promise_1["default"].password('Something you know: ')];
                case 1:
                    knowUtf8 = _a.sent();
                    return [4 /*yield*/, prompt_promise_1["default"].password('Something you have: ')];
                case 2:
                    haveUtf8 = _a.sent();
                    return [2 /*return*/, computePrivateKey({ knowUtf8: knowUtf8, haveUtf8: haveUtf8 })];
            }
        });
    });
}
exports.promptComputePrivateKey = promptComputePrivateKey;
function saveAddress(struct) {
    return __awaiter(this, void 0, void 0, function () {
        var name, address;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = struct.name, address = struct.address;
                    return [4 /*yield*/, forgetmenot.set(name, address)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.saveAddress = saveAddress;
function getAddress(name) {
    return new pollenium_buttercup_1.Address(forgetmenot.get(name));
}
exports.getAddress = getAddress;
function promptNew() {
    return __awaiter(this, void 0, void 0, function () {
        var name, privateKey, keypair;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prompt_promise_1["default"]('Name: ')];
                case 1:
                    name = _a.sent();
                    return [4 /*yield*/, promptComputePrivateKey()];
                case 2:
                    privateKey = _a.sent();
                    keypair = new pollenium_ilex_1.Keypair(privateKey);
                    saveAddress({
                        name: name,
                        address: keypair.getAddress()
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.promptNew = promptNew;
function promptFetchKeypair(name) {
    return __awaiter(this, void 0, void 0, function () {
        var address, privateKey, keypair;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    address = getAddress(name);
                    if (address === null) {
                        throw new Error(name + " does not exist");
                    }
                    return [4 /*yield*/, promptComputePrivateKey()];
                case 1:
                    privateKey = _a.sent();
                    keypair = new pollenium_ilex_1.Keypair(privateKey);
                    if (!keypair.getAddress().uu.getIsEqual(address.uu)) {
                        throw new Error('Address mismatch');
                    }
                    return [2 /*return*/, keypair];
            }
        });
    });
}
exports.promptFetchKeypair = promptFetchKeypair;
