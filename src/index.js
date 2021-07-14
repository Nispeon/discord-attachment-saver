"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config(); // Recommended way of loading dotenv
var inversify_config_1 = __importDefault(require("./inversify.config"));
var types_1 = require("./types");
var bot = inversify_config_1.default.get(types_1.TYPES.Bot);
bot.listen().then(function () {
    console.log('Logged in!');
}).catch(function (error) {
    console.log('Oh no! ', error);
});
