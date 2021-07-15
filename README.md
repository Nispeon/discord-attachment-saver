# Discord.js attachement saver (WIP)

This project was purely made for myself, but I figured I might as well make it public in case someone ever finds it.  
I might make a better readme eventually. Either way, forks are welcome!

## What you need
- Typescript
- Nodejs >= 10.0
- npm

## How to use

- Rename `.env.example` into `.env`
- Create a Discord bot ([See the docs](https://discord.com/developers/docs/intro))
- Get your Bot's Token and copy it inside your `.env`
- Run `npm install`
- Run the `npm run start` to start the bot
- Once you've invited your bot to the desired channel, send `&saveall` and it will save every attachment to the `assets` folder  
  
  
By default, the bot looks searches through the last 500 messages posted, but this number can be changed by editing the LIMIT value in your `.env` file  


If you plan to change the code, don't forget to run `npm run watch` to compile your typescript code into regular javascript

## To be added

- Give option to download only images or every attachment type
- Create different folders in `assets` directory to store different attachment types separately 
- Add your Discord ID to the `.env` file to only allow your account to use the bot
  
  
## License

Licensed under the terms of the MIT License.
