"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var types_1 = require("./types");
var bot_1 = require("./bot");
var discord_js_1 = require("discord.js");
var container = new inversify_1.Container();
container.bind(types_1.TYPES.Bot).to(bot_1.Bot).inSingletonScope();
container.bind(types_1.TYPES.Client).toConstantValue(new discord_js_1.Client());
// @ts-ignore
container.bind(types_1.TYPES.Token).toConstantValue(process.env.TOKEN);
exports.default = container;
