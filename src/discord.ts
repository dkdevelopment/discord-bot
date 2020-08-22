import discord, { TextChannel, ClientEvents } from 'discord.js'
import getLogger from './helpers/logger'

const client = new discord.Client()
const log = getLogger('discord-core')

export const connect = () =>
  new Promise((resolve, reject) => {
    client.login(process.env.DISCORD_TOKEN)

    client.once('ready', () => {
      log.info(`Bot %o connected`, client.user?.username)
      resolve()
    })

    client.once('error', (error) => {
      log.error(`Error at connect -> %o`, error.message)
      reject(error)
    })
  })

export const listener = <T extends keyof ClientEvents>(event: T, handlerFn: (...args: ClientEvents[T]) => void) => [
  client.on(event, handlerFn)
]

export const sendMessage = async (
  message: string,
  channelId: string = process.env.DISCORD_CHANNEL_ID!
) => {
  assertConnected()

  const channel = await client.channels.fetch(channelId) as TextChannel

  await channel.send(message)
  log.trace('Sent message %o - channel %o', message, channel.name)
}

const assertConnected = () => {
  if (!client.readyAt) {
    throw new Error('Not connected')
  }
}
