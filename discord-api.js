import { Client, GatewayIntentBits } from "discord.js";
import { search_images } from "./tenor-api.js";
import { config } from "dotenv";
import { schedule } from "node-cron";
config()

/* export const discordClient = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds
    ]
})


discordClient.login(process.env.DISCORD_TOKEN) */

export class DiscordClient{

    channel = '' 
    scheduledAction = ''

    constructor(_client){
        this._client = new Client({
            intents: [
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.Guilds
            ]
        })
        this.login()
        this.channel = this._client.channels.cache.get('1216889704503578634')

        this.on()

    }

    login(){
        this._client.login(process.env.DISCORD_TOKEN)
    }

    on(){
        this._client.on('ready', async () => {
            console.log('Bot online...')

            schedule("* * * * *", async () => {
                console.log("chamando crontab...")
                let gif_url = await search_images("good morning")
                let channel = this._client.channels.cache.get('1216889704503578634')
            
                this.sendMessageFile(gif_url, channel)
            })

        })
    }

    sendMessageFile(url, channel){
        try{

            channel.send({
                files: [url]
              })
        }
        catch(error){
            console.log(error)
        }
        
    }
}