import "reflect-metadata";
import {Container} from "inversify";
import {TYPES} from "./types";
import {Bot} from "./bot";
import {Client} from "discord.js";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
// @ts-ignore
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
// @ts-ignore
container.bind<string>(TYPES.Limit).toConstantValue(process.env.LIMIT);
// @ts-ignore
container.bind<string>(TYPES.Prefix).toConstantValue(process.env.PREFIX);

export default container;