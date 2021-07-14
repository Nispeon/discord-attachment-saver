"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
var discord_js_1 = require("discord.js");
var inversify_1 = require("inversify");
var types_1 = require("./types");
var fs = require('fs');
var fetch = require('node-fetch');
var Bot = /** @class */ (function () {
    function Bot(client, token) {
        this.client = client;
        this.token = token;
        this.prefix = "&";
    }
    Bot.prototype.getMessages = function (channel, limit) {
        if (limit === void 0) { limit = 100; }
        return __awaiter(this, void 0, void 0, function () {
            var out, last, messages, rounds, last_id, x, options, messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        out = [];
                        if (!(limit <= 100)) return [3 /*break*/, 2];
                        return [4 /*yield*/, channel.messages.fetch({ limit: limit })];
                    case 1:
                        messages = _a.sent();
                        out.push.apply(out, messages.array());
                        return [3 /*break*/, 6];
                    case 2:
                        rounds = (limit / 100) + (limit % 100 ? 1 : 0);
                        last_id = "";
                        x = 0;
                        _a.label = 3;
                    case 3:
                        if (!(x < rounds)) return [3 /*break*/, 6];
                        options = {
                            limit: 100
                        };
                        if (last_id.length > 0) {
                            options.before = last_id;
                        }
                        return [4 /*yield*/, channel.messages.fetch(options)];
                    case 4:
                        messages = _a.sent();
                        out.push.apply(out, messages.array());
                        last = messages.array()[(messages.array().length - 1)];
                        if (last != undefined) {
                            last_id = last.id;
                        }
                        else {
                            return [3 /*break*/, 6];
                        }
                        _a.label = 5;
                    case 5:
                        x++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, out];
                }
            });
        });
    };
    Bot.prototype.download = function (url, filename, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var response, buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.buffer()];
                    case 2:
                        buffer = _a.sent();
                        fs.writeFile('./assets/memories/' + filename, buffer, callback);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.listen = function () {
        var _this = this;
        this.client.on('message', function (message) {
            // Initialize code
            if (!message.content.startsWith(_this.prefix))
                return;
            var withoutPrefix = message.content.slice(_this.prefix.length);
            var split = withoutPrefix.split(/ +/);
            var command = split[0];
            var args = split.slice(1);
            function getUserFromMention(mention) {
                // The id is the first and only match found by the RegEx.
                var matches = mention.toString().match(/^<@!?(\d+)>$/);
                // If supplied variable was not a mention, matches will be null instead of an array.
                if (!matches)
                    return;
                // However, the first element in the matches array will be the entire mention, not just the ID,
                // so use index 1.
                var id = matches[1];
                return discord_js_1.Client.users.cache.get(id);
            }
            switch (command) {
                case 'saveall':
                    try {
                        _this.getMessages(message.channel, 200).then(function (items) {
                            for (var i = 0; i < items.length; i++) {
                                items[i].attachments.forEach(function (attachment) {
                                    if (attachment != undefined) {
                                        _this.download(attachment.url, attachment.id + '.png', function () {
                                            console.log('done');
                                        });
                                    }
                                });
                            }
                        });
                    }
                    catch (error) {
                        console.error(error);
                    }
                    console.log("oui");
                    break;
                default:
                    return message.reply("la commande n'a pas été reconnue");
            }
            console.log("Message received! Contents: ", message.content);
        });
        return this.client.login(this.token);
    };
    Bot = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.TYPES.Client)),
        __param(1, inversify_1.inject(types_1.TYPES.Token))
    ], Bot);
    return Bot;
}());
exports.Bot = Bot;
