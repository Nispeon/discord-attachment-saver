import {
    ChannelLogsQueryOptions,
    Client,
    Collection,
    DMChannel,
    Message,
    MessageEmbed,
    NewsChannel,
    TextChannel
} from "discord.js";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import {channel} from "diagnostic_channel";
const fs = require('fs');
const fetch = require('node-fetch');

@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;
    private readonly limit: number;
    private readonly prefix: string;

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.Limit) limit: number,
        @inject(TYPES.Prefix) prefix: string

    ) {
        this.client = client;
        this.token = token;
        this.limit = limit;
        this.prefix = prefix;
    }

    public async getMessages(channel: TextChannel | DMChannel | NewsChannel, limit: number = 100): Promise<Message[]> {
        let out: Message[] = []
        let last: Message
        if (limit <= 100) {
            let messages: Collection<string, Message> = await channel.messages.fetch({limit: limit})
            out.push(...messages.array())
        } else {
            let rounds = (limit / 100) + (limit % 100 ? 1 : 0)
            let last_id: string = ""
            for (let x = 0; x < rounds; x++) {
                const options: ChannelLogsQueryOptions = {
                    limit: 100
                }
                if (last_id.length > 0) {
                    options.before = last_id
                }
                const messages: Collection<string, Message> = await channel.messages.fetch(options)
                out.push(...messages.array())
                last = messages.array()[(messages.array().length - 1)]
                if (last != undefined) {
                    last_id = last.id
                } else {
                    break;
                }
            }
        }
        return out
    }

    public async download(url: any, filename: any, callback: any) {
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile('./assets/' + filename, buffer, callback)
    }

    public listen(): Promise<string> {
        this.client.on('message', (message: Message) => {

            // Initialize code
            if (!message.content.startsWith(this.prefix)) return;

            const withoutPrefix = message.content.slice(this.prefix.length);
            const split = withoutPrefix.split(/ +/);
            const command = split[0];
            const args = split.slice(1);

            function getUserFromMention(mention: any) {
                // The id is the first and only match found by the RegEx.
                const matches = mention.toString().match(/^<@!?(\d+)>$/);

                // If supplied variable was not a mention, matches will be null instead of an array.
                if (!matches) return;

                // However, the first element in the matches array will be the entire mention, not just the ID,
                // so use index 1.
                const id = matches[1];

                return Client.users.cache.get(id);
            }

            switch (command) {
                case 'saveall':
                    try {
                        this.getMessages(message.channel, this.limit).then(items => {
                            for (let i = 0; i < items.length; i++) {
                                items[i].attachments.forEach((attachment) => {
                                    if (attachment != undefined ) {
                                        let ext = attachment.name.split('.')
                                        this.download(attachment.url, attachment.id + '.' + ext[ext.length - 1], function(){
                                            console.log('done');
                                        });
                                    }
                                })

                            }
                        })
                    } catch (error) {
                        console.error(error);
                    }

                    return message.channel.send('The images have been downloaded.')
                    break;
                case 'up':
                  message.channel.send('I am online');
                default:

                    return message.reply("The command was not recognised");

            }
            console.log("Message received! Contents: ", message.content);
        });

        return this.client.login(this.token);
    }
}